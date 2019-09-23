import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    vaultPolicyId: {
      type: String
    },
    role: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({ vaultPolicyId, role }, viewer) {
    const invitation = await VaultPolicies.findOne({
      _id: vaultPolicyId
    })

    if (!invitation) throw new Error('Invitation not found')

    if (invitation.creatorId !== viewer.userId) throw new Error('You dont have permissions')

    await invitation.update({ $set: { role } })

    return true
  }
})
