export default () =>
  process.env.ORION_LOCAL
    ? process.env.AWS_S3_LOCAL_BASE_PATH_ID
    : process.env.ORION_DEVELOPMENT
    ? process.env.AWS_S3_DEV_BASE_PATH_ID
    : process.env.ORION_BETA
    ? process.env.AWS_S3_BETA_BASE_PATH_ID
    : 'prod'
