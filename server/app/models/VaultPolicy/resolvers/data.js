import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(vaultPolicy, params, viewer) {
    return {
      vaultPolicyId: vaultPolicy._id,
      vaultId: vaultPolicy.vaultId,
      vaultName: await vaultPolicy.vaultName(),
      userEmail: vaultPolicy.userEmail,
      createdAt: vaultPolicy.createdAt
    }
  }
})
