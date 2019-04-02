import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'
import crypto from 'crypto'

export default async function({file}) {
  const {accountId, applicationKey, bucketId} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const responseData = await b2.getUploadUrl({
    bucketId
  })

  const {authorizationToken, uploadUrl} = responseData.data
  const {body, name, type} = file
  const hash = crypto
    .createHash('sha1')
    .update(file.body)
    .digest('hex')

  let result, hasError
  try {
    result = await b2.uploadFile({
      uploadUrl,
      fileName: name,
      hash,
      uploadAuthToken: authorizationToken,
      mime: type,
      data: body
    })
  } catch (error) {
    hasError = !!error
  }

  if (hasError) throw new Error('Error uploading archive ', name)

  return result
}
