import {basePath} from './basePath'
import {bucket} from './bucket'

export const AWSCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket,
  basePath,
  canUpload: function(params, viewer) {
    return true
  }
}
