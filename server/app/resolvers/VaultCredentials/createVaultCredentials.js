import {resolver} from '@orion-js/app'
import VaultCredentials from 'app/collections/VaultCredentials'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    credentialType: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  async resolve({vaultId, credentialType}, viewer) {
    const insertParams = {
      userId: viewer.userId,
      vaultId,
      credentialType
    }

    const vaultCredentialsId = await VaultCredentials.insert(insertParams)

    return vaultCredentialsId
  }
})
