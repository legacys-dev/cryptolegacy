import {resolver} from '@orion-js/app'
import DownloadRequests from 'app/collections/DownloadRequests'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    const downloadRequest = await DownloadRequests.findOne({fileId: file._id})

    if (!downloadRequest) return {status: 'not available'}

    const {jobId} = downloadRequest
    const {vaultName} = file.glacierData

    const local = process.env.ORION_DEV
    const beta = process.env.ORION_BETA

    const extension = `get-aws-job-output/${vaultName}/${jobId}`

    const donwloadUrl = local
      ? `http://localhost:3000/${extension}`
      : beta
      ? `https://apidev.cryptolegacy.io/${extension}`
      : `https://apidev.cryptolegacy.io/${extension}`

    return donwloadUrl
  }
})
