import B2 from 'backblaze-b2'
import { B2Credentials } from './credentials'

export default async function({ fileId }) {
  const { accountId, applicationKey } = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  await b2.authorize()

  const result = await b2.downloadFileById({
    fileId,
    responseType: 'arraybuffer'
  })

  return result.data
}
