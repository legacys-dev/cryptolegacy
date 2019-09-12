import { job } from '@orion-js/jobs'
import Files from 'app/collections/Files'
import VaultPolicies from 'app/collections/VaultPolicies'
import { downloadElement } from 'app/helpers/awsS3'
import { uploadFile } from 'app/helpers/googleDrive'
import isEmpty from 'lodash/isEmpty'

const time = process.env.ORION_LOCAL ? 1000 * 60 : 1000 * 60 * 30

export default job({
  type: 'recurrent',
  runEvery: time, // must be 30 minutes
  async run(params) {
    const limitSize = 1024 * 1024 * 99 // 99MB
    const files = await Files.find({
      status: 'active',
      storage: 'drive',
      's3Data.status': 'uploaded',
      'driveData.status': 'pending',
      's3Data.deletedFromS3': false,
      's3Data.size': { $lte: limitSize }
    })
      .sort({ createdAt: 1 })
      .toArray()
    console.log('HOLA')
    if (isEmpty(files)) return
    console.log('No está vacío')
    for (const file of files) {
      const { bucket, key } = file.s3Data
      const downloadedFile = await downloadElement({ bucket, key })
      const vaultPolicy = await VaultPolicies.findOne({ vaultId: file.vaultId }) // This is for find the folderId
      const folderDriveId = vaultPolicy.driveFolderId // Maybe exist other form to avoid get vaultPolicy for each file
      file.update({ $set: { 'driveData.status': 'uploading' } }) // await not necessary

      let driveResult
      try {
        driveResult = await uploadFile({
          file: downloadedFile,
          fileName: file.name,
          fileType: file.type,
          folderId: folderDriveId
        })
      } catch (error) {
        file.update({ $set: { 'driveData.status': 'pending', 'driveData.errorAtUpload': error } }) // await not necessary
        continue
      }

      const driveId = driveResult
      file.update({
        $set: {
          'driveData.driveId': driveId,
          'driveData.status': 'uploaded'
        }
      }) // await not necessary
    }
  }
})
