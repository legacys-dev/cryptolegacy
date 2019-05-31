export default () =>
  process.env.ORION_LOCAL
    ? process.env.B2_LOCAL_BUCKET_NAME
    : process.env.ORION_DEVELOPMENT
    ? process.env.B2_DEV_BUCKET_NAME
    : 'prod'
