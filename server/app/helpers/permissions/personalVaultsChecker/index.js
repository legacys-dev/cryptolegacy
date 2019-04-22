import cloneDeep from 'lodash/cloneDeep'
import personalVaultPermission from './personalVaultPermission'
import deletePersonalVault from './deletePersonalVault'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {vaultOwner, personalVaultForDelete} = options
  const {personalVaultId} = params

  if (vaultOwner) {
    await personalVaultPermission({personalVaultId, viewer})
  }

  if (personalVaultForDelete) {
    await deletePersonalVault({viewer, personalVaultId})
  }
}
