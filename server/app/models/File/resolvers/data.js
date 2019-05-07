import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    const {s3Data} = file
    return {
      name: s3Data.name,
      type: s3Data.type,
      size: s3Data.size,
      vaultId: file.userVaultId,
      storageType: file.storage,
      status: file.status
    }
  }
})
