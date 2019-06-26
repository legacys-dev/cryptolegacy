import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import {downloadElement} from 'app/helpers/awsS3'
import {singleUpload} from 'app/helpers/awsGlacier'
import isEmpty from 'lodash/isEmpty'

const time = process.env.ORION_LOCAL ? 1000 * 60 : 1000 * 60 * 30

export default job({
  type: 'recurrent',
  runEvery: time, // Must be 20 minutes
  async run(params) {
    const limitSize = 1024 * 1024 * 99 // 99MB
    const files = await Files.find({
      status: 'active',
      storage: 'glacier',
      's3Data.status': 'uploaded',
      'glacierData.status': 'pending',
      's3Data.deletedFromS3': false,
      's3Data.size': {$lte: limitSize}
    })
      .sort({createdAt: 1})
      .toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      const {bucket, key} = file.s3Data
      const downloadedFile = await downloadElement({bucket, key})

      file.update({$set: {'glacierData.status': 'uploading'}}) // await not necessary

      let glacierResult
      try {
        glacierResult = await singleUpload({
          file: downloadedFile,
          archiveDescription: file.userId
        })
      } catch (error) {
        file.update({$set: {'glacierData.status': 'pending', 'glacierData.errorAtUpload': error}}) // await not necessary
        continue
      }

      const {archiveId, location, checksum, vaultName} = glacierResult
      file.update({
        $set: {
          'glacierData.archiveId': archiveId,
          'glacierData.location': location,
          'glacierData.checksum': checksum,
          'glacierData.vaultName': vaultName,
          'glacierData.status': 'uploaded'
        }
      }) // await not necessary
    }
  }
})
