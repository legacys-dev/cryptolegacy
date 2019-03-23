import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import downloadFromS3 from 'app/helpers/awsS3/downloadElement'
import singleUploadToGlacier from 'app/helpers/awsGlacier/singleUpload'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60,
  async run(params) {
    const limitSize = 1024 * 1024 * 99 // 99MB
    const oldestFile = await Files.find({
      's3Data.status': 'uploaded',
      's3Data.deletedFromS3': false,
      's3Data.size': {$lte: limitSize},
      'glacierData.status': 'pending'
    })
      .sort({createdAt: 1})
      .limit(1)
      .toArray()

    if (isEmpty(oldestFile)) return

    const file = oldestFile[0]
    const {bucket, key} = file.s3Data
    const s3Element = await downloadFromS3({bucket, key})

    let glacierResult, errorAtUpload
    await file.update({$set: {'glacierData.status': 'uploading'}})

    try {
      glacierResult = await singleUploadToGlacier({
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

    const {archiveId, location, checksum} = glacierResult
    await file.update({
      $set: {
        'glacierData.archiveId': archiveId,
        'glacierData.location': location,
        'glacierData.checksum': checksum,
        'glacierData.status': 'uploaded'
      }
    })

    return true
  }
})
