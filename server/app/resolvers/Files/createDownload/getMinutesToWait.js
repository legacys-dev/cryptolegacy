import DownloadRequests from 'app/collections/DownloadRequests'

const waitTypes = [
  '3 and 5 hours',
  '2 and 4 hours',
  '1 and 3  hours',
  '1 and 120 minutes',
  '1 and 60 minutes',
  '1 and 5 minutes'
]

export default async function({file}) {
  const downloadRequest = await DownloadRequests.findOne({fileId: file._id})

  const timeStart = new Date(downloadRequest.createdAt).getHours()
  const timeEnd = new Date().getHours()

  const hoursDiff = timeEnd - timeStart

  return waitTypes[hoursDiff]
}
