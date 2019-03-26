export const AWSCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_S3_BUCKET,
  basePath: process.env.AWS_S3_BASE_PATH_ID,
  canUpload: function(params, viewer) {
    return true
  }
}
