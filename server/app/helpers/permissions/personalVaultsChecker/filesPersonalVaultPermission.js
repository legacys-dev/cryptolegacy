import {PermissionsError} from '@orion-js/app'
import isEmpty from 'lodash/isEmpty'
import PersonalVaults from 'app/collections/PersonalVaults'

export default async function({viewer, personalVaultId, deletedFiles}) {
  if (deletedFiles && !personalVaultId) return

  const personalVault = await PersonalVaults.findOne(personalVaultId)

  if (isEmpty(personalVault)) throw new Error('Vault not found')

  const {userId} = personalVault

  if (!isEmpty(userId.localeCompare(viewer.userId))) {
    throw new PermissionsError('unauthorized', {message: 'Unauthorized personal vault access'})
  }
}
