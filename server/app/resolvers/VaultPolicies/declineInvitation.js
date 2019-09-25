import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    vaultPolicyId: {
      type: String
    },
    accessToken: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({ vaultPolicyId }, viewer) {
    const invitation = await VaultPolicies.findOne({
      _id: vaultPolicyId,
      userId: viewer.userId,
      status: 'available'
    })

    if (!invitation) throw new Error('Invitation not found')

    await invitation.remove()

    return true
  }
})
