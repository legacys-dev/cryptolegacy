import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import {deleteArchive as deleteFileInS3} from 'app/helpers/awsS3'
import {deleteArchive as deleteFileInB2} from 'app/helpers/backblazeB2'
import {deleteArchive as deleteFileInGlacier} from 'app/helpers/awsGlacier'
import isEmpty from 'lodash/isEmpty'

export default job({
  type: 'recurrent',
  runEvery: 1000 * 60 * 10,
  async run(params) {
    const files = await Files.find({status: 'authorizedToRemove'}).toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      const {s3Data, b2Data, glacierData} = file
      let hasError = false

      if (!s3Data.deletedFromS3) {
        const {key, bucket} = s3Data
        deleteFileInS3({key, bucket})
      }

      if (s3Data.deletedFromS3 && file.storage === 'b2') {
        const fileName = s3Data.name
        const {fileId} = b2Data
        deleteFileInB2({fileName, fileId})
      }

      if (s3Data.deletedFromS3 && file.storage === 'glacier') {
        const {archiveId, vaultName} = glacierData
        deleteFileInGlacier({archiveId, vaultName})
      }

      if (!hasError) await file.remove()
    }
  }
})
