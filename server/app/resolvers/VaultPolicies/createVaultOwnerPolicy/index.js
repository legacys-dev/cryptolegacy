import {resolver} from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'
import Users from 'app/collections/Users'
import getVaultPassword from './getVaultPassword'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    credentials: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  async resolve({vaultId, credentials}, viewer) {
    const user = await Users.findOne({_id: viewer.userId})
    const {privateKey, passphrase} = user.messageKeys

    const vaultPassword = await getVaultPassword({
      credentials,
      privateKey,
      passphrase,
      vaultId,
      userId: viewer.userId
    })

    const insertParams = {
      userId: viewer.userId,
      userEmail: await user.email(),
      vaultId,
      credentialType: 'owner',
      vaultPassword,
      status: 'active'
    }

    const vaultPolicyId = await VaultPolicies.insert(insertParams)

    return vaultPolicyId
  }
})
