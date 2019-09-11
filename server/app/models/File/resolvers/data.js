import { resolver } from '@orion-js/app'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    return {
      _id: file._id,
      name: file.name,
      type: file.type,
      size: file.s3Data.size,
      vaultId: file.vaultId,
      vaultName: await file.vaultName(),
      storageType: file.storage,
      status: file.status,
      createdAt: file.createdAt
    }
  }
})
