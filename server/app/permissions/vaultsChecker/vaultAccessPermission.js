import { PermissionsError } from '@orion-js/app'
import isEmpty from 'lodash/isEmpty'
import VaultPolicies from 'app/collections/VaultPolicies'

export default async function({ viewer, vaultId }) {
  const vaultPolicy = await VaultPolicies.findOne({ vaultId, userId: viewer.userId })

  if (isEmpty(vaultPolicy)) {
    throw new PermissionsError('unauthorized', { message: 'Vault permissions denied' })
  }

  const { credentialType } = vaultPolicy

  if (
    isEmpty(credentialType) ||
    (credentialType !== 'owner' && credentialType !== 'heritage' && credentialType !== 'invitation')
  ) {
    throw new PermissionsError('unauthorized', { message: 'Vault permissions denied' })
  }
}
