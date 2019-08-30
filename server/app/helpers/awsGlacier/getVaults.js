import AWS from 'aws-sdk'
import { AWSCredentials } from './credentials'

export default async function() {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    limit: 5,
    marker: null
  }

  return await new Promise((resolve, reject) => {
    glacier.listVaults(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })
}
