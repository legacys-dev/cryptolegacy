import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({vaultName}) {
  const glacier = new AWS.Glacier(AWSCredentials)

  let result
  let hasError

  try {
    result = await new Promise((resolve, reject) => {
      glacier.createVault({vaultName}, function(error, data) {
        if (error) reject(error)
        else resolve(data)
      })
    })
  } catch (error) {
    hasError = !!error
  }

  if (hasError) throw new Error('Error creating glacier vault')

  return result
}
