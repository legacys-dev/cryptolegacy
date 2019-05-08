import {resolver} from '@orion-js/app'
import {deleteArchive as deleteFileInS3} from 'app/helpers/awsS3'
import {deleteArchive as deleteFileInB2} from 'app/helpers/backblazeB2'
import {deleteArchive as deleteFileInGlacier} from 'app/helpers/awsGlacier'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    userId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({userId}, viewer) {
    const files = await Files.find({userId: viewer.userId, status: 'deleted'}).toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      const {s3Data, b2Data, glacierData} = file
      let hasError = false

      if (!s3Data.deletedFromS3) {
        const {key, bucket} = s3Data
        await deleteFileInS3({key, bucket})
      }

      if (s3Data.deletedFromS3 && file.storage === 'b2') {
        const fileName = s3Data.name
        const {fileId} = b2Data
        const response = await deleteFileInB2({fileName, fileId})
        if (!response) hasError = true
      }

      if (s3Data.deletedFromS3 && file.storage === 'glacier') {
        const {archiveId, vaultName} = glacierData
        const response = await deleteFileInGlacier({archiveId, vaultName})
        if (!response) hasError = true
      }

      if (!hasError) await file.remove()
    }

    return true
  }
})
