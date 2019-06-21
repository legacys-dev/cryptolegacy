import cloneDeep from 'lodash/cloneDeep'
import vaultPolicyPermissions from './vaultPolicyPermissions'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {vaultPoliciesPaginatedPermissions} = options

  if (vaultPoliciesPaginatedPermissions) {
    const {vaultId, filter, adminPanel, status} = params
    await vaultPolicyPermissions({vaultId, filter, adminPanel, status, viewer})
  }
}
