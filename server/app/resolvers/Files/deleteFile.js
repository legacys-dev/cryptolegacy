import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'

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
  filePermissions: true,
  vaultOwner: true,
  requireLogin: true,
  async resolve({fileId, personalVaultId}, viewer) {
    const file = await Files.findOne(fileId)
    await file.update({$set: {status: 'deleted', updateAt: new Date()}})
    await file.updateVault()
    return true
  }
})
