import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  checkSession: true,
  async resolve(params, viewer) {
    return {
      accessKeyId: process.env.AWS_S3_UPLOAD_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_UPLOAD_KEY_ID,
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_S3_BUCKET
    }
  }
})
