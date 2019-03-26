import {resolver} from '@orion-js/app'
import DownloadRequests from 'app/collections/DownloadRequests'
import getJobOutput from 'app/helpers/awsGlacier/getJobOutput'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    const downloadRequest = await DownloadRequests.findOne({fileId: file._id})

    if (!downloadRequest) return {status: 'not available'}

    const downloadParams = {
      jobId: downloadRequest.jobId,
      vaultName: file.glacierData.vaultName
    }

    let result, retrievalError
    try {
      result = await getJobOutput(downloadParams)
    } catch (error) {
      retrievalError = !!error
      console.log(error)
    }

    if (retrievalError) return {status: 'not available'}

    return {
      status: 'available',
      name: file.s3DAta.name,
      type: await file.getType(),
      body: result.body.toString('hex')
    }
  }
})
