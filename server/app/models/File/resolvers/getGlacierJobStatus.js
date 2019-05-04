import {resolver} from '@orion-js/app'
import {getJobInformation} from 'app/helpers/awsGlacier'
import DownloadRequests from 'app/collections/DownloadRequests'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const downloadRequest = await DownloadRequests.findOne({fileId: file._id})

    if (!downloadRequest) return

    const downloadParams = {
      jobId: downloadRequest.jobId,
      vaultName: file.glacierData.vaultName
    }

    let result
    let retrievalError
    try {
      result = await getJobInformation(downloadParams)
    } catch (error) {
      retrievalError = !!error
      console.log(error)
    }

    if (retrievalError) return {status: 'not available'}

    return result
  }
})
