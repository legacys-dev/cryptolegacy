import {resolver} from '@orion-js/app'
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
  async resolve({fileId}, viewer) {
    const file = await Files.findOne({_id: fileId})
    const status = file.storage.includes('b2')
      ? {'b2Data.status': 'pending'}
      : {'glacierData.status': 'pending'}

    const updateData = {
      ...{'s3Data.status': 'uploaded'},
      ...status
    }

    await file.update({$set: updateData})
    await file.updateVault()

    const activityTypeParams = {
      activityType: 'file',
      actionType: 'uploadFile',
      fileName: file.s3Data.name,
      vaultName: await file.vaultName(),
      status: 'finished'
    }

    await createActivity(activityTypeParams, viewer)

    return true
  }
})
