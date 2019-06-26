import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import {downloadElement} from 'app/helpers/awsS3'
import {uploadFile} from 'app/helpers/backblazeB2'
import isEmpty from 'lodash/isEmpty'

const time = process.env.ORION_LOCAL ? 1000 * 60 : 1000 * 60 * 30

export default job({
  type: 'recurrent',
  runEvery: time, // must be 30 minutes
  async run(params) {
    const limitSize = 1024 * 1024 * 99 // 99MB
    const files = await Files.find({
      status: 'active',
      storage: 'b2',
      's3Data.status': 'uploaded',
      'b2Data.status': 'pending',
      's3Data.deletedFromS3': false,
      's3Data.size': {$lte: limitSize}
    })
      .sort({createdAt: 1})
      .toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      const {bucket, key} = file.s3Data
      const downloadedFile = await downloadElement({bucket, key})

      file.update({$set: {'b2Data.status': 'uploading'}}) // await not necessary

      let b2Result
      try {
        b2Result = await uploadFile({
          file: downloadedFile,
          fileName: file.cloudName,
          type: file.type
        })
      } catch (error) {
        file.update({$set: {'b2Data.status': 'pending', 'b2Data.errorAtUpload': error}}) // await not necessary
        continue
      }

      const {fileId, bucketId, contentSha1, bucketName} = b2Result
      file.update({
        $set: {
          'b2Data.fileId': fileId,
          'b2Data.bucketId': bucketId,
          'b2Data.bucketName': bucketName,
          'b2Data.contentSha1': contentSha1,
          'b2Data.status': 'uploaded'
        }
      }) // await not necessary
    }
  }
})
