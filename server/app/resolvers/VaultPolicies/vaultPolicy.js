import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    vaultPolicyId: {
      type: String
    }
  },
  returns: 'blackbox',
  requireLogin: true,
  async resolve({ vaultPolicyId }, viewer) {
    const policy = await VaultPolicies.findOne({ _id: vaultPolicyId })

    return {
      _id: policy._id,
      vaultId: policy.vaultId,
      vaultName: await policy.vaultName(),
      userEmail: policy.userEmail,
      status: policy.status,
      role: policy.role
    }
  }
})
