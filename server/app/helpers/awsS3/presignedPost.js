import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({key, bucket, params}) {
  const {accessKeyId, secretAccessKey, region} = AWSCredentials
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
  })

  return await new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Bucket: bucket,
        Conditions: [
          ['content-length-range', params.size, params.size],
          {'Content-Type': params.type},
          {Key: key}
        ],
        Fields: {
          key: key,
          'Content-Type': params.type
        }
      },
      function(error, data) {
        if (error) reject(error)
        else resolve(data)
      }
    )
  })
}
