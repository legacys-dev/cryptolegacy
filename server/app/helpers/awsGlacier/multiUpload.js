import AWS from 'aws-sdk'
import {AWSCredentials} from './credentials'

export default async function(file, vaultName, archiveDescription) {
  const glacier = new AWS.Glacier(AWSCredentials)
  // Create a new service object and some supporting variables
  const buffer = Buffer.alloc(2.5 * 1024 * 1024) // 2.5MB buffer
  const partSize = 1024 * 1024 // 1MB chunks,
  let numPartsLeft = Math.ceil(buffer.length / partSize)
  const startTime = new Date()
  const params = {vaultName, partSize: partSize.toString()}

  // Compute the complete SHA-256 tree hash so we can pass it
  // to completeMultipartUpload request at the end
  const treeHash = glacier.computeChecksums(buffer).treeHash

  // Initiate the multipart upload
  console.log('Initiating upload to', vaultName)
  // Call Glacier to initiate the upload.
  glacier.initiateMultipartUpload(params, function(mpErr, multipart) {
    if (mpErr) {
      console.log('Error!', mpErr.stack)
      return
    }
    console.log('Got upload ID', multipart.uploadId)

    // Grab each partSize chunk and upload it as a part
    for (let i = 0; i < buffer.length; i += partSize) {
      const end = Math.min(i + partSize, buffer.length)
      const partParams = {
        vaultName: vaultName,
        uploadId: multipart.uploadId,
        range: 'bytes ' + i + '-' + (end - 1) + '/*',
        body: buffer.slice(i, end)
      }

      // Send a single part
      console.log('Uploading part', i, '=', partParams.range)
      glacier.uploadMultipartPart(partParams, function(multiErr, mData) {
        if (multiErr) return
        console.log('Completed part', this.request.params.range)
        if (--numPartsLeft > 0) {
          console.log('DONE')
          return // complete only when all parts uploaded
        }

        const doneParams = {
          vaultName: vaultName,
          uploadId: multipart.uploadId,
          archiveSize: buffer.length.toString(),
          checksum: treeHash // the computed tree hash
        }

        console.log('Completing upload...')
        glacier.completeMultipartUpload(doneParams, function(err, data) {
          if (err) {
            console.log('An error occurred while uploading the archive')
            console.log(err)
          } else {
            const delta = (new Date() - startTime) / 1000
            console.log('Completed upload in', delta, 'seconds')
            console.log('Archive ID:', data.archiveId)
            console.log('Checksum:  ', data.checksum)
          }
        })
      })
    }
  })
}
