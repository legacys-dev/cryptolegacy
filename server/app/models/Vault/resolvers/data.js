import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(vault, params, viewer) {
    return {
      _id: vault._id,
      name: vault.name,
      createdAt: vault.createdAt,
      fileCount: await vault.fileCount(),
      storageUsed: await vault.storageUsed(),
      storageType: await vault.storageType()
    }
  }
})
