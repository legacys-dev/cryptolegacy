import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import createActivity from 'app/resolvers/Activities/createActivity'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    },
    vaultId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  filePermissions: true,
  async resolve({fileId, vaultId}, viewer) {
    const file = await Files.findOne(fileId)
    await file.update({$set: {status: 'active', updateAt: new Date()}})

    const activityTypeParams = {
      activityType: 'file',
      actionType: 'restoreFile',
      fileName: file.s3Data.name,
      vaultName: await file.vaultName(),
      status: 'finished'
    }

    await createActivity(activityTypeParams, viewer)

    return true
  }
})
