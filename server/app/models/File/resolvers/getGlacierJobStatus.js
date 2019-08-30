import { resolver } from '@orion-js/app'
import DownloadRequests from 'app/collections/DownloadRequests'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const downloadRequest = await DownloadRequests.findOne({ fileId: file._id })

    if (!downloadRequest) return

    return { status: downloadRequest.status }
  }
})
