import getBucketId from './getBucketId'
import getBucketName from './getBucketName'

export const B2Credentials = {
  accountId: process.env.B2_ACCOUNT_ID,
  applicationKey: process.env.B2_APPLICATION_KEY_ID,
  bucketId: getBucketId(),
  bucketName: getBucketName()
}
