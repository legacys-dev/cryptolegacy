import DownloadRequests from 'app/collections/DownloadRequests'

export default async function({file}) {
  const downloadRequest = await DownloadRequests.findOne({fileId: file._id})

  const timeStart = new Date(downloadRequest.createdAt).getHours()
  const timeEnd = new Date().getHours()

  const hoursDiff = timeEnd - timeStart

  return !hoursDiff
    ? '3 - 5 hours'
    : hoursDiff === 1
    ? '2 - 4 hours'
    : hoursDiff === 2
    ? '1 - 3  hours'
    : hoursDiff === 3
    ? '1 - 120 minutes'
    : hoursDiff === 4
    ? '1 - 60 minutes'
    : hoursDiff === 5
    ? '1 - 5 minutes'
    : 'almost ready'
}
