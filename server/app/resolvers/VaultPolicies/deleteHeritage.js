import {resolver, PermissionsError} from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    vaultPolicyId: {
      type: 'ID'
    },
    vaultId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  async resolve({vaultPolicyId, vaultId}, viewer) {
    const heritage = await VaultPolicies.findOne({
      _id: vaultPolicyId,
      vaultId,
      status: 'waiting',
      credentialType: 'heritage'
    })

    if (!heritage) throw new Error('Heritage not found')
    if (heritage.userId !== viewer.userId) {
      throw new PermissionsError('unauthorized', {
        message: 'You dont have permissions to access this heritage'
      })
    }

    heritage.remove() // await not necessary

    return true
  }
})
