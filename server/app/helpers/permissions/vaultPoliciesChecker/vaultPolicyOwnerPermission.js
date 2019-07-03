import {PermissionsError} from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default async function({vaultId, viewer}) {
  if (!vaultId) throw new Error('Vault identificator required')

  const vaultPolicy = await VaultPolicies.findOne({vaultId})

  if (!vaultPolicy) throw new Error('Vault credentials not found')

  if (vaultPolicy.creatorId !== viewer.userId) {
    throw new PermissionsError('unauthorized', {message: 'You dont have vault credentials'})
  }
}
