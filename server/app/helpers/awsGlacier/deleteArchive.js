import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({archiveId, vaultName}) {
  const glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    archiveId,
    vaultName
  }

  let result
  let hasError

  try {
    result = await new Promise((resolve, reject) => {
      glacier.deleteArchive(params, function(error, data) {
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
