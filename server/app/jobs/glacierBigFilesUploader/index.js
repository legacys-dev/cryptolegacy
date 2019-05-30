import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import {downloadElement} from 'app/helpers/awsS3'
import {multiUpload} from 'app/helpers/awsGlacier'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60 * 20,
  async run(params) {
    const startSize = 1024 * 1024 * 500.00000000000001
    const limitSize = 1024 * 1024 * 1000 // 1GB

    const files = await Files.find({
      storage: 'glacier',
      's3Data.status': 'uploaded',
      'glacierData.status': 'pending',
      's3Data.deletedFromS3': false,
      $and: [{'s3Data.size': {$gte: startSize}}, {'s3Data.size': {$lte: limitSize}}]
    })
      .sort({createdAt: 1})
      .toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      const {bucket, key} = file.s3Data
      const s3Element = await downloadElement({bucket, key})

      let glacierResult
      let errorAtUpload
      await file.update({$set: {'glacierData.status': 'uploading'}})

      const vaultName = process.env.ORION_DEV
        ? process.env.AWS_S3_GLACIER_LOCAL_BUCKET
        : process.env.ORION_BETA
        ? process.env.AWS_S3_GLACIER_DEV_BUCKET
        : 'prod'

      try {
        glacierResult = await multiUpload({
          file: s3Element,
          vaultName,
          archiveDescription: file.userId
        })
      } catch (error) {
        await file.update({
          $set: {'glacierData.status': 'pending', 'glacierData.errorAtUpload': error}
        })
        errorAtUpload = !!error
        console.log(error)
      }

      if (errorAtUpload) continue

      const {archiveId, location, checksum} = glacierResult
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
  }
})
