import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function(uploadId, vaultName) {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    uploadId,
    vaultName
  }

  let result
  let hasError

  try {
    result = await new Promise((resolve, reject) => {
      glacier.abortMultipartUpload(params, function(error, data) {
        if (error) reject(error)
        else resolve(data)
      })
    })
  } catch (error) {
    hasError = !!error
  }

  if (hasError) throw new Error('Error aborting multi upload to glacier')

  return result
}
