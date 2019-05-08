import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'
import {deleteArchive as deleteFileInS3} from 'app/helpers/awsS3'
import {deleteArchive as deleteFileInB2} from 'app/helpers/backblazeB2'
import {deleteArchive as deleteFileInGlacier} from 'app/helpers/awsGlacier'

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
      const {s3Data, b2Data, glacierData, deletedFromS3} = file
      let hasError = false

      if (!deletedFromS3) {
        const {key, bucket} = s3Data
        try {
          await deleteFileInS3({key, bucket})
        } catch (error) {
          hasError = !!error
        }
      } else if (file.storage === 'b2') {
        const fileName = s3Data.name
        const {fileId} = b2Data
        try {
          await deleteFileInB2({fileName, fileId})
        } catch (error) {
          hasError = !!error
        }
      } else if (file.storage === 'glacier') {
        const {archiveId, vaultName} = glacierData
        try {
          await deleteFileInGlacier({archiveId, vaultName})
        } catch (error) {
          hasError = !!error
        }
      }
      if (!hasError) {
        await file.remove()
      }
    }
    return true
  }
})
