import AWS from 'aws-sdk'
import {generateId} from '@orion-js/app'
import {AWSCredentials} from './credentials'

export default async function(params, viewer) {
  const {accessKeyId, secretAccessKey, region, bucket, canUpload, basePath} = AWSCredentials
  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region
  })

  if (canUpload) {
    if (!(await canUpload(params, viewer))) return null
  }

  const key = `${basePath}/${generateId()}-${generateId()}-${params.name}`

  const result = await new Promise((resolve, reject) => {
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

  return {
    ...result,
    key,
    bucket
  }
}
