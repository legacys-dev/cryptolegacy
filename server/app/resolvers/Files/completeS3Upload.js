import { resolver } from '@orion-js/app'
import Files from 'app/collections/Files'
import createActivity from 'app/resolvers/Activities/createActivity'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  filePermissions: true,
  async resolve({ fileId }, viewer) {
    const file = await Files.findOne({ _id: fileId })

    let status
    if (file.storage.includes('b2')) {
      status = { 'b2Data.status': 'pending' }
    } else if (file.storage.includes('glacier')) {
      status = { 'glacierData.status': 'pending' }
    } else {
      status = { 'driveData.status': 'pending' }
    }

    console.log('status: ', status)
    const updateData = {
      ...{ 's3Data.status': 'uploaded' },
      ...status
    }

    await file.update({ $set: updateData })
    await file.updateVault()

    const activityTypeParams = {
      activityType: 'file',
      actionType: 'uploadFile',
      fileName: file.name,
      vaultName: await file.vaultName(),
      status: 'finished'
    }

    createActivity(activityTypeParams, viewer) // await not necessary

    return true
  }
})
