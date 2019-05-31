export const bucketId = process.env.ORION_DEV
  ? process.env.B2_LOCAL_BUCKET_ID
  : process.env.ORION_BETA
  ? process.env.B2_DEV_BUCKET_ID
  : 'prod'
