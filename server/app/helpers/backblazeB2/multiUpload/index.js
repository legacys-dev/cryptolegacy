import B2 from 'backblaze-b2'
import {B2Credentials} from '../credentials'
import getPartSize from './getPartSize'
import crypto from 'crypto'

export default async function({file, fileName}) {
  const {accountId, applicationKey, bucketId} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const start = await b2.startLargeFile({bucketId, fileName})
  const {fileId} = start.data
  let {partSize, fileSize} = getPartSize(file.Body.length)

  let partNumber = 1
  const fileParts = []
  for (let start = 0; start < fileSize; start += partSize) {
    const end = Math.min(start + partSize, fileSize)
    const uploadPartResponse = await b2.getUploadPartUrl({fileId})
    const {uploadUrl, authorizationToken} = uploadPartResponse.data

    try {
      await b2.uploadPart({
        partNumber,
        uploadUrl,
        uploadAuthToken: authorizationToken,
        data: file.Body.slice(start, end)
      })
    } catch (error) {
      console.log(error)
    }
    fileParts.push(file.Body.slice(start, end))
    partNumber++
  }

  let result, hasError
  try {
    result = await b2.finishLargeFile({
      fileId,
      partSha1Array: fileParts.map(bufferPart =>
        crypto
          .createHash('sha1')
          .update(bufferPart)
          .digest('hex')
      )
    })
  } catch (error) {
    console.log(error)
    hasError = !!error
  }

  if (hasError) throw new Error('Error finishing large file upload')

  return result.data
}
