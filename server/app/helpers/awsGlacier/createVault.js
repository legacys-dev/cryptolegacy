import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({vaultName}) {
  const glacier = new AWS.Glacier(AWSCredentials)

  const result = await new Promise((resolve, reject) => {
    glacier.createVault({vaultName}, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })

  return result
}
