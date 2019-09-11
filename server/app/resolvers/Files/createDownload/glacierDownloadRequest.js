import { initiateRetrievalArchiveJob } from 'app/helpers/awsGlacier'
import DownloadRequests from 'app/collections/DownloadRequests'

export default async function({ file, type }) {
  const params = {
    vaultName: file.glacierData.vaultName,
    archiveId: file.glacierData.archiveId,
    tier: 'Standard' // file size, expedited only if the size is 0 - 250 mb
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
    jobId: result.jobId,
    location: result.location,
    status: 'pending',
    createdAt: new Date(),
    completionDate: null
  }

  if (type === 'create') {
    const insertParams = { fileId: file._id, vaultName: params.vaultName, ...requestParams }

    try {
      await DownloadRequests.insert(insertParams)
    } catch (error) {
      retrievalError = !!error
      console.log(error)
    }

    if (retrievalError) return
  } else if (type === 'update') {
    const downloadRequest = await DownloadRequests.findOne({ fileId: file._id })

    try {
      await downloadRequest.update({ $set: requestParams })
    } catch (error) {
      retrievalError = !!error
      console.log(error)
    }

    if (retrievalError) return
  }

  return {
    status: 'done',
    minutesToWait: params.tier === 'Standard' ? '3 - 5 hours' : '1 - 5 minutes'
  }
}
