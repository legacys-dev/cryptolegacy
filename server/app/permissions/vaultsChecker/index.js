import cloneDeep from 'lodash/cloneDeep'
import vaultOwnerPermission from './vaultOwnerPermission'
import driveVaultChecker from './driveVaultChecker'
import vaultNameChecker from './vaultNameChecker'
import filesVaultPermission from './filesVaultPermission'
import vaultAccessPermission from './vaultAccessPermission'
import heritageFilesChecker from './heritageFilesChecker'
import deleteVault from './deleteVault'
import plansChecker from './plansChecker';

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {
    vaultOwner,
    vaultAccess,
    filesVaultOwner,
    vaultForDelete,
    checkVaultName,
    heritageChecker,
    checkPlan
  } = options

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

  if (heritageChecker) {
    await heritageFilesChecker({viewer, vaultId})
  }

  const {type} = params
  if(checkPlan){
    await plansChecker({viewer,type})
  }
}
