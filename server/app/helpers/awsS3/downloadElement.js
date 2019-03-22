import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({bucket, key}) {
  const {accessKeyId, secretAccessKey, region} = AWSCredentials
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
  })

  const params = {Bucket: bucket, Key: key}

  const result = await new Promise((resolve, reject) => {
    s3.getObject(params, (error, data) => {
      if (error) reject(error)
      else resolve(data)
    })
  })

  return result
}
