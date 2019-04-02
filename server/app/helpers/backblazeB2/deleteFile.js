import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'

export default async function({file}) {
  const {accountId, applicationKey} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const {fileId, name} = file
  let result, hasError
  try {
    result = await b2.deleteFileVersion({
      fileId,
      fileName: name
    })
  } catch (error) {
    hasError = !!error
  }

  if (hasError) throw new Error('Error deleting archive ', name)

  return result
}
