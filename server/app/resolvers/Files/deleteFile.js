import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import createActivity from 'app/resolvers/Activities/createActivity'

export default resolver({
  params: {
    fileId: {
      type: 'ID'
    },
    personalVaultId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  filePermissions: true,
  async resolve({fileId, personalVaultId}, viewer) {
    const file = await Files.findOne(fileId)
    await file.update({$set: {status: 'deleted', updateAt: new Date()}})

    const activityTypeParams = {
      activityType: 'file',
      actionType: 'deleteFile',
      fileName: file.s3Data.name,
      vaultName: await file.vaultName(),
      status: 'finished'
    }

    await createActivity(activityTypeParams, viewer)

    return true
  }
})
