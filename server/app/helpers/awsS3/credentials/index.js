import getBasePath from './getBasePath'
import getBucket from './getBucket'

export const AWSCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: getBucket(),
  basePath: getBasePath(),
  canUpload: function(params, viewer) {
    return true
  }
}
