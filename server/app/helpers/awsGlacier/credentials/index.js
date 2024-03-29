import getVaultName from './getVaultName'

export const AWSCredentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: '2012-06-01',
  vaultName: getVaultName()
}
