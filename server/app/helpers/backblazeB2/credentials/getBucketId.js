export default () =>
  process.env.ORION_LOCAL
    ? process.env.B2_LOCAL_BUCKET_ID
    : process.env.ORION_DEVELOPMENT
    ? process.env.B2_DEV_BUCKET_ID
    : process.env.ORION_BETA
    ? process.env.B2_BETA_BUCKET_ID
    : 'prod'
