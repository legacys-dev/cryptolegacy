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
    const file = await Files.findOne(fileId)
    const {s3Data, b2Data, glacierData, storage} = file
    const fileName = s3Data.name

    if (!s3Data.deletedFromS3) {
      const downloadUrlFromS3 = await file.getFromS3()
      if (!downloadUrlFromS3) return {status: 'notAvailable'}

      return {status: 'available', fileName, downloadUrl: downloadUrlFromS3}
    } else if (storage.includes('b2')) {
      if (!b2Data.status.includes('uploaded')) return {status: 'notAvailable'}
      else {
        const downloadUrlFromB2 = await file.getFromB2()
        if (!downloadUrlFromB2) return {status: 'notAvailable'}

        return {status: 'available', fileName, downloadUrl: downloadUrlFromB2}
      }
    } else if (storage.includes('glacier')) {
      if (!glacierData.status.includes('uploaded')) return {status: 'notAvailable'}
      else {
        const downloadJob = await file.getGlacierJobStatus()
        if (!downloadJob) {
          console.log('creando job de glacier')
          const createGlacierJob = await glacierDownloadRequest({file, type: 'create'})
          if (!createGlacierJob) return {status: 'error'}

          return {status: 'glacierJobCreated', minutesToWait: createGlacierJob.minutesToWait}
        } else {
          console.log('el job existe')
          console.log({downloadJob})
          if (downloadJob.status === 'completed') {
            console.log('el job esta activo y puede retornar datos')
            const downloadUrlFromGlacier = await file.getFromGlacier()
            if (downloadUrlFromGlacier.includes('undefined')) return {status: 'notAvailable'}

            return {status: 'available', fileName, downloadUrl: downloadUrlFromGlacier}
          } else if (downloadJob.status === 'pending') {
            console.log('here')
            return {status: 'notAvailable'}
          } else if (downloadJob.status === 'jobDeleted') {
            const updateGlacierJob = await glacierDownloadRequest({file, type: 'create'})
            if (!updateGlacierJob) return {status: 'error'}
            return {status: 'glacierJobCreated', minutesToWait: updateGlacierJob.minutesToWait}
          }
        }
      }
    }
  }
})
