import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({archiveId, vaultName, tier}) {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    vaultName,
    jobParameters: {
      Description: 'get specific archvie job',
      ArchiveId: archiveId,
      SNSTopic: process.env.AWS_GLACIER_SNS_TOPIC,
      Type: 'archive-retrieval'
    }
  }

  let result
  let hasError

  try {
    result = await new Promise((resolve, reject) => {
      glacier.initiateJob(params, function(error, data) {
        if (error) reject(error)
        else resolve(data)
      })
    })
  } catch (error) {
    hasError = !!error
  }

  if (hasError) return

  return result
}
