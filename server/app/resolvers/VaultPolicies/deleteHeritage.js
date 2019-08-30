import { resolver } from '@orion-js/app'
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
  vaultPolicyOwner: true,
  requireLogin: true,
  async resolve({ vaultPolicyId, vaultId }, viewer) {
    const heritage = await VaultPolicies.findOne({
      _id: vaultPolicyId,
      vaultId,
      status: 'waiting',
      credentialType: 'heritage',
      creatorId: viewer.userId
    })

    if (!heritage) throw new Error('Heritage not found')

    heritage.remove() // await not necessary

    return true
  }
})
