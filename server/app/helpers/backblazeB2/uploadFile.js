import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'
import crypto from 'crypto'

export default async function({file, fileName, type}) {
  const {accountId, applicationKey, bucketId, bucketName} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const responseData = await b2.getUploadUrl({
    bucketId
  })

  const {authorizationToken, uploadUrl} = responseData.data
  const hash = crypto
    .createHash('sha1')
    .update(file.Body)
    .digest('hex')

  const result = await b2.uploadFile({
    uploadUrl,
    hash,
    fileName,
    uploadAuthToken: authorizationToken,
    mime: type,
    data: file.Body
  })

  return {
    bucketName,
    ...result.data
  }
}
