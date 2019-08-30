import { PermissionsError } from '@orion-js/app'
import isEmpty from 'lodash/isEmpty'
import VaultPolicies from 'app/collections/VaultPolicies'

export default async function({ viewer, vaultId, deletedFiles }) {
  if (deletedFiles && !vaultId) return

  const vaultPolicy = await VaultPolicies.findOne({ vaultId, userId: viewer.userId })

  if (isEmpty(vaultPolicy)) throw new PermissionsError('Vault not found')
}
