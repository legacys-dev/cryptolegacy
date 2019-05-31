import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({vaultName}) {
  const glacier = new AWS.Glacier(AWSCredentials)

  const params = {
    vaultName,
    jobParameters: {
      Description: 'My vault inventory job',
      Format: 'JSON',
      SNSTopic: process.env.AWS_GLACIER_SNS_TOPIC,
      Type: 'inventory-retrieval'
    }
  }

  return await new Promise((resolve, reject) => {
    glacier.initiateJob(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
