import cloneDeep from 'lodash/cloneDeep'
import vaultPolicyPermissions from './vaultPolicyPermissions'
import vaultPolicyOwnerPermission from './vaultPolicyOwnerPermission'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {vaultPoliciesPaginatedPermissions, vaultPolicyOwner} = options

  if (vaultPoliciesPaginatedPermissions) {
    const {vaultId, filter, adminPanel, status} = params
    await vaultPolicyPermissions({vaultId, filter, adminPanel, status, viewer})
  }

  if (vaultPolicyOwner) {
    const {vaultId} = params
    await vaultPolicyOwnerPermission({vaultId, viewer})
  }
}
