export default () =>
  process.env.ORION_LOCAL
    ? process.env.AWS_S3_GLACIER_LOCAL_BUCKET
    : process.env.ORION_DEVELOPMENT
    ? process.env.AWS_S3_GLACIER_DEV_BUCKET
    : process.env.ORION_BETA
    ? process.env.AWS_S3_GLACIER_BETA_BUCKET
    : 'prod'
