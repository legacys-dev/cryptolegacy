import Users from 'app/collections/Users'
import {publicEncrypt} from 'app/helpers/crypto'

export default async function getUploadCredentials(params, viewer) {
  const user = await Users.findOne({_id: viewer.userId})
  const {publicKey} = user.messageKeys

  const credentials = {
    accessKeyId: process.env.AWS_S3_UPLOAD_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_UPLOAD_KEY_ID,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_S3_LOCAL_BUCKET
  }
  const encrypted = publicEncrypt({toEncrypt: credentials, publicKey: publicKey})
  console.log('encrypted', encrypted)
  return encrypted
}
