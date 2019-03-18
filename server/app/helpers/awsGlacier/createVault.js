import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function(vaultName) {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    vaultName
  }

  const result = await new Promise((resolve, reject) => {
    glacier.createVault(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })

  return result
}
