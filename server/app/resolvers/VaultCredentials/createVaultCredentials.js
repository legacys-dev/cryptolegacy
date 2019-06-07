import {resolver} from '@orion-js/app'
import VaultCredentials from 'app/collections/VaultCredentials'
import {createMasterHash, generateCipherKeys} from 'app/helpers/keys'
import {encryptMessage} from 'app/helpers/openPgp'
import Users from 'app/collections/Users'

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
    const {masterKey} = createMasterHash()
    const vaultMasterPassword = await generateCipherKeys(masterKey)

    const user = await Users.findOne({_id: viewer.userId})
    const {publicKey} = user.messageKeys

    const encryptedCredentials = await encryptMessage({
      publicKey,
      textToEncrypt: vaultMasterPassword
    })

    const insertParams = {
      userId: viewer.userId,
      vaultId,
      credentialType,
      encryptedCredentials
    }

    const vaultCredentialsId = await VaultCredentials.insert(insertParams)

    return vaultCredentialsId
  }
})
