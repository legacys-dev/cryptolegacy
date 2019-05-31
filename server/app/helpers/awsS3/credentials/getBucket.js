export default () =>
  process.env.ORION_LOCAL
    ? process.env.AWS_S3_LOCAL_BUCKET
    : process.env.ORION_DEVELOPMENT
    ? process.env.AWS_S3_DEV_BUCKET
    : 'prod'
