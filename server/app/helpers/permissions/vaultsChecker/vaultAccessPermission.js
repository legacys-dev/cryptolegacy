import {PermissionsError} from '@orion-js/app'
import isEmpty from 'lodash/isEmpty'
import VaultCredentials from 'app/collections/VaultCredentials'

export default async function({viewer, vaultId}) {
  const vaultCredential = await VaultCredentials.findOne({vaultId, userId: viewer.userId})

  if (isEmpty(vaultCredential)) {
    throw new PermissionsError('unauthorized', {message: 'Vault permissions denied'})
  }

  const {credentialType} = vaultCredential

  if (isEmpty(credentialType) || (credentialType !== 'owner' && credentialType !== 'heritage')) {
    throw new PermissionsError('unauthorized', {message: 'Vault permissions denied'})
  }
}
