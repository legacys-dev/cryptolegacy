import {resolver} from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    userId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({userId}, viewer) {
    const policy = await VaultPolicies.findOne({userId, creatorId: viewer.userId})

    if (!policy) throw new Error('Vault policy not found')

    await policy.remove()

    return true
  }
})
