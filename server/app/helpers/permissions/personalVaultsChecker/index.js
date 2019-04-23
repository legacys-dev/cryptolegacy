import cloneDeep from 'lodash/cloneDeep'
import personalVaultPermission from './personalVaultPermission'
import deletePersonalVault from './deletePersonalVault'
import personalVaultNameChecker from './personalVaultNameChecker'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {vaultOwner, personalVaultForDelete, personalVNameChecker} = options
  const {personalVaultId, name} = params

  if (vaultOwner) {
    await personalVaultPermission({viewer, personalVaultId})
  }

  if (personalVNameChecker) {
    await personalVaultNameChecker({viewer, name})
  }

  if (personalVaultForDelete) {
    await deletePersonalVault({viewer, personalVaultId})
  }
}
