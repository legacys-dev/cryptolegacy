import AWS from 'aws-sdk'
import { AWSCredentials } from './credentials'

export default async function({ key, bucket }) {
  const { accessKeyId, secretAccessKey, region } = AWSCredentials
  const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region })

  const params = { Bucket: bucket, Key: key, Expires: 60 }

  return await new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
