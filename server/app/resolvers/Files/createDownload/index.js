import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import glacierDownloadRequest from './glacierDownloadRequest'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    }
  },
  returns: 'blackbox',
  mutation: true,
  requireLogin: true,
  filePermissions: true,
  async resolve({fileId}, viewer) {
    console.log({fileId})
    const file = await Files.findOne(fileId)
    const fileName = file.s3Data.name

    if (!file.s3Data.deletedFromS3) {
      const downloadUrlFromS3 = await file.getFromS3()
      if (!downloadUrlFromS3) return {status: 'notAvailable'}

      return {status: 'available', fileName, downloadUrl: downloadUrlFromS3}
    }

    if (file.storage.includes('b2')) {
      if (!file.b2Data.status.includes('uploaded')) return {status: 'notAvailable'}
      else {
        const downloadUrlFromB2 = await file.getFromB2()
        if (!downloadUrlFromB2) return {status: 'notAvailable'}

        return {status: 'available', fileName, downloadUrl: downloadUrlFromB2}
      }
    }

    if (file.storage.includes('glacier')) {
      if (!file.glacierData.status.includes('uploaded')) return {status: 'notAvailable'}
      else {
        const jobStatus = await file.getGlacierJobStatus()
        if (!jobStatus) {
          const createGlacierJob = await glacierDownloadRequest({file})
          if (!createGlacierJob) return {status: 'error'}
          return {status: 'glacierJobCreated', minutesToWait: 5}
        } else {
          console.log({jobStatus})
          return {}
        }
      }
    }
  }
})
