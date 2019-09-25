import { PermissionsError } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'

export default async function({ vaultId, viewer }) {
  if (!vaultId) throw new Error('Vault identificator required')

  const vaultPolicy = await VaultPolicies.findOne({ vaultId, userId: viewer.userId })

  if (!vaultPolicy) {
    throw new PermissionsError('unauthorized', { message: 'You dont have vault credentials' })
  }

  if (!vaultPolicy.credentialType) {
    throw new PermissionsError('unauthorized', { message: 'You dont have vault permissions' })
  }

  if (vaultPolicy.credentialType === 'owner') return

  if (vaultPolicy.credentialType !== 'invitation') {
    throw new PermissionsError('unauthorized', { message: 'You dont have vault permissions' })
  }

  if (vaultPolicy.credentialType === 'invitation' && vaultPolicy.role === 'admin') return

  throw new PermissionsError('unauthorized', { message: 'You dont have vault permissions' })
}
