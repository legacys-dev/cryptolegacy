import B2 from 'backblaze-b2'
import {B2Credentials} from '../credentials'
import getPartSize from './getPartSize'
import crypto from 'crypto'

export default async function({file}) {
  const {accountId, applicationKey, bucketId} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const fileContent = file.Body
  const fileName = file.name
  const start = await b2.startLargeFile({bucketId, fileName})
  const {fileId} = start.data
  let {partSize, fileSize} = getPartSize(fileContent.length)

  let partNumber = 1
  const fileParts = []
  for (let i = 0; i < fileSize; i += partSize) {
    const end = Math.min(i + partSize, fileSize)
    const uploadPartResponse = await b2.getUploadPartUrl({fileId})
    const {uploadUrl, authorizationToken} = uploadPartResponse.data

    try {
      await b2.uploadPart({
        partNumber,
        uploadUrl,
        uploadAuthToken: authorizationToken,
        data: fileContent.slice(i, end)
      })
    } catch (error) {
      console.log('Error:', error)
    }
    fileParts.push(fileContent.slice(i, end))
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

  return result
}
