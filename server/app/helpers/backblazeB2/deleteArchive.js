import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'

export default async function({fileId, fileName}) {
  const {accountId, applicationKey} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  let result, hasError
  try {
    result = await b2.deleteFileVersion({
      fileId,
      fileName
    })
  } catch (error) {
    hasError = !!error
  }

  if (hasError) throw new Error('Error deleting archive ', name)

  return result
}
