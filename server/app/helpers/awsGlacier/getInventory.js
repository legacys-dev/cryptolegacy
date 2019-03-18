import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function(vaultName) {
  const glacier = new AWS.Glacier(AWSCredentials)

  const params = {
    vaultName,
    jobParameters: {
      Description: 'My inventory job',
      Format: 'JSON',
      SNSTopic: 'create_one',
      Type: 'inventory-retrieval'
    }
  }

  const result = await new Promise((resolve, reject) => {
    glacier.initiateJob(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })

  return result
}
