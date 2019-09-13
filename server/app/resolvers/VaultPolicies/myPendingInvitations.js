import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {},
  returns: 'blackbox',
  requireLogin: true,
  async resolve(params, viewer) {
    const invitations = await VaultPolicies.find({
      userId: viewer.userId,
      credentialType: 'invitation',
      status: 'available'
    }).toArray()

    for (const invitation of invitations) {
      if (!invitation.viewed) invitation.update({ $set: { viewed: true } })
    }

    const data = invitations.map(async invitation => {
      return {
        vaultPolicyId: invitation._id,
        userId: invitation.userId,
        vaultId: invitation.vaultId,
        vaultName: await invitation.vaultName(),
        userEmail: invitation.userEmail,
        createdAt: invitation.createdAt,
        status: invitation.status,
        creatorEmail: await invitation.creatorEmail(),
        role: invitation.role
      }
    })

    return { items: await Promise.all(data) }
  }
})
