import cloneDeep from 'lodash/cloneDeep'
import vaultOwnerPermission from './vaultOwnerPermission'
import deleteVault from './deleteVault'
import vaultNameChecker from './vaultNameChecker'
import filesVaultPermission from './filesVaultPermission'
import vaultAccessPermission from './vaultAccessPermission'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {vaultOwner, vaultAccess, filesVaultOwner, vaultForDelete, checkVaultName} = options
  const {vaultId, name} = params

  if (vaultOwner) {
    await vaultOwnerPermission({viewer, vaultId})
  }

  if (vaultAccess) {
    await vaultAccessPermission({viewer, vaultId})
  }

  if (filesVaultOwner) {
    const {deletedFiles} = params
    await filesVaultPermission({viewer, vaultId, deletedFiles})
  }

  if (checkVaultName) {
    await vaultNameChecker({viewer, name})
  }

  if (vaultForDelete) {
    await deleteVault({viewer, vaultId})
  }
}
