import {PermissionsError} from '@orion-js/app'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'
import VaultCredentials from 'app/collections/VaultCredentials'

export default async function({vaultId, filter, adminPanel, status, viewer}) {
  if (adminPanel) {
    const admin = await Users.findOne({_id: viewer.userId})

    if (isEmpty(admin)) {
      throw new PermissionsError('unauthorized', {message: 'Your user was not found'})
    }

    if (!admin.roles || !admin.roles.includes('admin')) {
      throw new PermissionsError('unauthorized', {message: 'You need admin credentials'})
    }
  } else {
    if (!vaultId) throw new Error('Vault identificator required')

    const vaultCredentials = await VaultCredentials.findOne({vaultId})

    if (!vaultCredentials) throw new Error('Vault credentials not found')

    if (vaultCredentials.userId !== viewer.userId) {
      throw new PermissionsError('unauthorized', {message: 'You dont have vault credentials'})
    }
  }
}
