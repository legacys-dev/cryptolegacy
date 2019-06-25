import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({vaultName}) {
  const glacier = new AWS.Glacier(AWSCredentials)

  return await new Promise((resolve, reject) => {
    glacier.createVault({vaultName}, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
