import { resolver } from '@orion-js/app'
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
  async resolve({ fileId, vaultId }, viewer) {
    const file = await Files.findOne(fileId)
    file.update({ $set: { status: 'active', updateAt: new Date() } }) // await not necessary

    const activityTypeParams = {
      activityType: 'file',
      actionType: 'restoreFile',
      fileName: file.name,
      vaultName: await file.vaultName(),
      status: 'finished'
    }

    createActivity(activityTypeParams, viewer) // await not necessary

    return true
  }
})
