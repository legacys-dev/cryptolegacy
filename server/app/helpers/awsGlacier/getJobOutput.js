import AWS from 'aws-sdk'
import { AWSCredentials } from './credentials'

export default async function({ vaultName, jobId }) {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    jobId,
    vaultName,
    range: ''
  }

  return await new Promise((resolve, reject) => {
    glacier.getJobOutput(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
