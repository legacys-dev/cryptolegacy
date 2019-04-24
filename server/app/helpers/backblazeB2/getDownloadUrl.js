import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'

export default async function({bucketId, fileName}) {
  const {accountId, applicationKey} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  const authorize = await b2.authorize()

  return authorize.data.downloadUrl
}
