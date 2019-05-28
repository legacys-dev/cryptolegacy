import {resolver} from '@orion-js/app'
import VaultCredentials from 'app/collections/VaultCredentials'

export default resolver({
  params: {},
  returns: String,
  async resolve(vault, params, viewer) {
    const vaultCredential = await VaultCredentials.findOne({
      vaultId: vault._id,
      userId: viewer.userId
    })
    return vaultCredential.credentialType
  }
})
