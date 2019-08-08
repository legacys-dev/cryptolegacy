import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    return {
      name: file.name,
      type: file.type,
      size: file.s3Data.size,
      vaultId: file.vaultId,
      storageType: file.storage,
      status: file.status
    }
  }
})
