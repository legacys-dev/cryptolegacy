import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import initiateRetrievalArchiveJob from 'app/helpers/awsGlacier/initiateRetrievalArchiveJob'
import DownloadRequests from 'app/collections/DownloadRequests'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  async resolve({fileId}, viewer) {
    const file = await Files.findOne(fileId)
    if (!file) throw new Error('File not found')

    const params = {
      archiveId: file.glacierData.archiveId,
      vaultName: file.glacierData.vaultName
    }

    let result, retrievalError
    try {
      result = await initiateRetrievalArchiveJob(params)
    } catch (error) {
      retrievalError = !!error
      console.log(error)
    }

    if (retrievalError) throw new Error('Error on retrieval archive')

    const requestParams = {
      fileId: file._id,
      jobId: result.jobId,
      location: result.location,
      createdAt: new Date()
    }

    await DownloadRequests.insert(requestParams)

    return true
  }
})
