import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default resolver({
  params: {},
  returns: String,
  async resolve(vault, params, viewer) {
    const vaultPolicy = await VaultPolicies.findOne({
      vaultId: vault._id,
      userId: viewer.userId
    })
    return vaultPolicy.credentialType
  }
})
