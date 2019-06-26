import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(file, params, viewer) {
    const {s3Data} = file
    return {
      name: file.name,
      type: file.type,
      size: s3Data.size,
      vaultId: file.vaultId,
      storageType: file.storage,
      status: file.status
    }
  }
})
