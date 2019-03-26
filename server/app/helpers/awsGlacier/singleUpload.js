import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function({file, vaultName, archiveDescription}) {
  const s3Glacier = new AWS.Glacier(AWSCredentials)
  const params = {
    vaultName,
    archiveDescription,
    body: file.Body,
    checksum: s3Glacier.computeChecksums(file.Body).treeHash
  }

  const result = await new Promise((resolve, reject) => {
    s3Glacier.uploadArchive(params, function(error, data) {
      if (error) reject(error)
      else resolve(data)
    })
  })

  return {
    vaultName,
    ...result
  }
}
