import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({jobId, vaultName}) {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    jobId,
    vaultName
  }

  const result = await new Promise((resolve, reject) => {
    glacier.describeJob(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })

  return result
}
