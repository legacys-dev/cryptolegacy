export const basePath = process.env.ORION_DEV
  ? process.env.AWS_S3_LOCAL_BASE_PATH_ID
  : process.env.ORION_BETA
  ? process.env.AWS_S3_DEV_BASE_PATH_ID
  : 'prod'
