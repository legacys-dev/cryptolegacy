export const bucket = process.env.ORION_DEV
  ? process.env.AWS_S3_LOCAL_BUCKET
  : process.env.ORION_BETA
  ? process.env.AWS_S3_DEV_BUCKET
  : 'prod'
