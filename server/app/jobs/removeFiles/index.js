import {job} from '@orion-js/jobs'
import Files from 'app/collections/Files'
import {deleteArchive as deleteFileInS3} from 'app/helpers/awsS3'
import {deleteArchive as deleteFileInB2} from 'app/helpers/backblazeB2'
import {deleteArchive as deleteFileInGlacier} from 'app/helpers/awsGlacier'
import isEmpty from 'lodash/isEmpty'

const time = process.env.ORION_LOCAL ? 1000 * 60 : 1000 * 60 * 30

export default job({
  type: 'recurrent',
  runEvery: time, // Must be 30 minutes
  async run(params) {
    const files = await Files.find({status: 'authorizedToRemove'}).toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      const {s3Data, b2Data, glacierData, storage} = file
      const {deletedFromS3} = s3Data

      if (!deletedFromS3) {
        const {key, bucket} = s3Data
        deleteFileInS3({key, bucket})
      } else if (storage === 'b2') {
        const fileName = s3Data.name
        const {fileId} = b2Data
        deleteFileInB2({fileName, fileId})
      } else if (storage === 'glacier') {
        const {archiveId, vaultName} = glacierData
        deleteFileInGlacier({archiveId, vaultName})
      }
      file.remove() // await not necessary
    }
  }
})
