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

    const {ORION_LOCAL, ORION_DEVELOPMENT, ORION_BETA} = process.env
    const extension = `get-aws-job-output/${vaultName}/${jobId}`

    const donwloadUrl = ORION_LOCAL
      ? `http://localhost:3000/${extension}`
      : ORION_DEVELOPMENT
      ? `https://apidev.cryptolegacy.io/${extension}`
      : ORION_BETA
      ? `https://apibeta.cryptolegacy.io/${extension}`
      : 'prod'

    return donwloadUrl
  }
})
