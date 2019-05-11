import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({key, bucket, params}) {
  const {region} = AWSCredentials
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_UPLOAD_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_UPLOAD_KEY_ID,
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
