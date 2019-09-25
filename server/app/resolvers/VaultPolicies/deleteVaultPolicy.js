import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    vaultPolicyId: {
      type: String
    },
    userId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({ vaultPolicyId, userId }, viewer) {
    const policy = await VaultPolicies.findOne({
      _id: vaultPolicyId,
      userId,
      creatorId: viewer.userId
    })

    if (!policy) throw new Error('Vault policy not found')

    await policy.remove()

    return true
  }
})
