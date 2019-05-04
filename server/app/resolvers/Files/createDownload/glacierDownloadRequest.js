import {initiateRetrievalArchiveJob} from 'app/helpers/awsGlacier'
import DownloadRequests from 'app/collections/DownloadRequests'

export default async function({file}) {
  const params = {
    archiveId: file.glacierData.archiveId,
    vaultName: file.glacierData.vaultName
  }

  let result
  let retrievalError
  try {
    result = await initiateRetrievalArchiveJob(params)
  } catch (error) {
    retrievalError = !!error
    console.log(error)
  }

  if (retrievalError) return

  const requestParams = {
    fileId: file._id,
    jobId: result.jobId,
    location: result.location,
    createdAt: new Date()
  }

  try {
    await DownloadRequests.insert(requestParams)
  } catch (error) {
    retrievalError = !!error
    console.log('Error:', error)
  }

  if (retrievalError) return

  return {status: 'done'}
}
