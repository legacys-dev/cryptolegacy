import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import {downloadElement} from 'app/helpers/awsS3'
import {multiUpload} from 'app/helpers/awsGlacier'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60,
  async run(params) {
    const startSize = 1024 * 1024 * 99.00000000000001
    const limitSize = 1024 * 1024 * 500 // 1GB

    const oldestFile = await Files.find({
      storage: 'glacier',
      's3Data.status': 'uploaded',
      'glacierData.status': 'pending',
      's3Data.deletedFromS3': false,
      $and: [{'s3Data.size': {$gte: startSize}}, {'s3Data.size': {$lte: limitSize}}]
    })
      .sort({createdAt: 1})
      .limit(1)
      .toArray()

    if (isEmpty(oldestFile)) return

    const file = oldestFile[0]
    const {bucket, key} = file.s3Data
    const s3Element = await downloadElement({bucket, key})

    let glacierResult
    let errorAtUpload
    await file.update({$set: {'glacierData.status': 'uploading'}})

    try {
      glacierResult = await multiUpload({
        file: s3Element,
        vaultName: 'Test',
        archiveDescription: file.userId
      })
    } catch (error) {
      await file.update({
        $set: {'glacierData.status': 'pending', 'glacierData.errorAtUpload': error}
      })
      errorAtUpload = !!error
      console.log(error)
    }

    if (errorAtUpload) return

    const {archiveId, location, checksum, vaultName} = glacierResult
    await file.update({
      $set: {
        'glacierData.archiveId': archiveId,
        'glacierData.location': location,
        'glacierData.checksum': checksum,
        'glacierData.vaultName': vaultName,
        'glacierData.status': 'uploaded'
      }
    })
  }
})
