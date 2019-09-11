import B2 from 'backblaze-b2'
import { B2Credentials } from './credentials'

export default async function({ bucketId, fileName }) {
  const { accountId, applicationKey } = B2Credentials
  const b2 = new B2({
    accountId,
    applicationKey
  })

  const logInb2 = await b2.authorize()

  const authorization = await b2.getDownloadAuthorization({
    bucketId,
    fileNamePrefix: fileName.split('.')[0],
    validDurationInSeconds: 350
  })

  return {
    url: logInb2.data.downloadUrl,
    authorizationToken: authorization.data.authorizationToken
  }
}
