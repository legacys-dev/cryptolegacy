import B2 from 'backblaze-b2'
import {B2Credentials} from './credentials'

export default async function({bucketId}) {
  const {accountId, applicationKey} = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const bucket = await b2.getBucket({bucketId})

  return bucket.data.buckets[0]
}
