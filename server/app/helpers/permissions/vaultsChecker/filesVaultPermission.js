import {PermissionsError} from '@orion-js/app'
import isEmpty from 'lodash/isEmpty'
import VaultCredentials from 'app/collections/VaultCredentials'

export default async function({viewer, vaultId, deletedFiles}) {
  if (deletedFiles && !vaultId) return

  const vaultCredential = await VaultCredentials.findOne({vaultId, userId: viewer.userId})

  if (isEmpty(vaultCredential)) throw new PermissionsError('Vault not found')
}
