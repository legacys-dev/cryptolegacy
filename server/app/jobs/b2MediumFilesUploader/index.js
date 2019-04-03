import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import downloadFromS3 from 'app/helpers/awsS3/downloadElement'
import multiUploadToB2 from 'app/helpers/backblazeB2/multiUpload'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60,
  async run(params) {
    const startSize = 1024 * 1024 * 99.00000000000001
    const limitSize = 1024 * 1024 * 500 // 99MB

    const oldestFile = await Files.find({
      storage: 'b2',
      's3Data.status': 'uploaded',
      'b2Data.status': 'pending',
      's3Data.deletedFromS3': false,
      $and: [{'s3Data.size': {$gte: startSize}}, {'s3Data.size': {$lte: limitSize}}]
    })
      .sort({createdAt: 1})
      .limit(1)
      .toArray()

    if (isEmpty(oldestFile)) return

    const file = oldestFile[0]
    const {bucket, key} = file.s3Data
    const s3Element = await downloadFromS3({bucket, key})

    let b2Result, errorAtUpload
    await file.update({$set: {'b2Data.status': 'uploading'}})

    try {
      b2Result = await multiUploadToB2({
        file: s3Element,
        fileName: file.s3Data.name
      })
    } catch (error) {
      await file.update({
        $set: {'b2Data.status': 'pending'}
      })
      errorAtUpload = !!error
      console.log(error)
    }

    if (errorAtUpload) return

    const {fileId, bucketId, contentSha1} = b2Result
    await file.update({
      $set: {
        'b2Data.fileId': fileId,
        'b2Data.bucketId': bucketId,
        'b2Data.contentSha1': contentSha1,
        'b2Data.status': 'uploaded'
      }
    })
  }
})
