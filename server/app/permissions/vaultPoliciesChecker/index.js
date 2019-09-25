import cloneDeep from 'lodash/cloneDeep'
import vaultPolicyPermissions from './vaultPolicyPermissions'
import vaultPolicyOwnerPermission from './vaultPolicyOwnerPermission'
import requirePlanChecker from './requirePlanChecker'
import ownerOrAdminChecker from './ownerOrAdminChecker'

export default async function(options, viewer, { params }) {
  params = cloneDeep(params)

  const {
    vaultPoliciesPaginatedPermissions,
    vaultPolicyOwner,
    requirePlan,
    policyAuthorization
  } = options

  if (vaultPoliciesPaginatedPermissions) {
    const { vaultId, filter, adminPanel, status } = params
    await vaultPolicyPermissions({ vaultId, filter, adminPanel, status, viewer })
  }

  if (vaultPolicyOwner) {
    const { vaultId } = params
    await vaultPolicyOwnerPermission({ vaultId, viewer })
  }

  if (requirePlan) {
    await requirePlanChecker({ viewer })
  }

  if (policyAuthorization) {
    const { vaultId } = params
    await ownerOrAdminChecker({ vaultId, viewer })
  }
}
