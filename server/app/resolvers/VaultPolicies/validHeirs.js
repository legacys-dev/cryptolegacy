import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {
    accessToken: {
      type: String
    }
  },
  returns: String,
  requireLogin: true,
  async resolve({accessToken}, viewer) {
    const vaultPolicy = await VaultPolicies.findOne({accessToken, status: 'available'})
    if (!vaultPolicy) return

    const user = await Users.findOne({'emails.address': vaultPolicy.userEmail})

    if (!user) return
    if (user._id !== viewer.userId) return

    return await vaultPolicy.vaultName()
  }
})
