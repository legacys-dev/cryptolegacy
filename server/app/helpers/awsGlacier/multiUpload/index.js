import AWS from 'aws-sdk'
import {AWSCredentials} from '../credentials'
import getPartSize from './getPartSize'

export default async function(file, vaultName, archiveDescription) {
  let {partSize, numPartsLeft, fileSize} = getPartSize(file.length)
  const params = {vaultName, partSize: partSize.toString()}

  const glacier = new AWS.Glacier(AWSCredentials)
  const treeHash = glacier.computeChecksums(file).treeHash

  const startTime = new Date()
  const initiateUpload = await new Promise((resolve, reject) => {
    glacier.initiateMultipartUpload(params, function(error, multiPartData) {
      if (error) reject(error)
      else resolve(multiPartData)
    })
  })

  let uploadPart
  for (let i = 0; i < fileSize; i += partSize) {
    const end = Math.min(i + partSize, fileSize)
    const partParams = {
      vaultName: vaultName,
      uploadId: initiateUpload.uploadId,
      range: 'bytes ' + i + '-' + (end - 1) + '/*',
      body: file.slice(i, end)
    }

    uploadPart = await new Promise((resolve, reject) => {
      glacier.uploadMultipartPart(partParams, function(error, data) {
        if (error) reject(error)
        if (--numPartsLeft > 0) resolve('pendingParts')
        resolve('done') // all parts uploaded
      })
    })
  }

  let archiveData
  if (uploadPart === 'done') {
    const doneParams = {
      vaultName: vaultName,
      uploadId: initiateUpload.uploadId,
      archiveSize: file.length.toString(),
      checksum: treeHash
    }

    archiveData = await new Promise((resolve, reject) => {
      glacier.completeMultipartUpload(doneParams, function(error, data) {
        if (error) reject(error)
        else {
          const delta = (new Date() - startTime) / 1000
          resolve({completeSeconds: delta, ...data})
        }
      })
    })
  } else throw new Error('error uploading parts')

  return archiveData
}