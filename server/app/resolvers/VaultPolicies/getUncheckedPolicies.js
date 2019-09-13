import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {},
  returns: Number,
  requireLogin: true,
  async resolve(params, viewer) {
    const invitations = await VaultPolicies.find({
      userId: viewer.userId,
      credentialType: 'invitation',
      status: 'available',
      viewed: false
    }).toArray()

    if (!invitations) return []

    return invitations.length
  }
})
