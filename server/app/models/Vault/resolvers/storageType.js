import { resolver } from '@orion-js/app'

export default resolver({
  params: {},
  returns: String,
  async resolve(vault, params, viewer) {
    const storageTypes = {
      b2: 'fileManager.simpleType',
      glacier: 'fileManager.highType',
      drive: 'fileManager.drive'
    }

    return storageTypes[vault.type]
  }
})
