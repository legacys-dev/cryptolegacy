import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'

export default async function({fileId}) {
  const {accountId, applicationKey} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  let result, hasError
  try {
    result = await b2.downloadFileById({
      fileId,
      responseType: 'arraybuffer'
    })
  } catch (error) {
    hasError = !!error
    console.log('Error:', error)
  }

  if (hasError) throw new Error('Error downloading file')

  return result.data
}
