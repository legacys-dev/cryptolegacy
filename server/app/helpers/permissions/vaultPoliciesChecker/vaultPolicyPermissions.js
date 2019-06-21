import {PermissionsError} from '@orion-js/app'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'
import VaultPolicies from 'app/collections/VaultPolicies'

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

    const vaultPolicy = await VaultPolicies.findOne({vaultId})

    if (!vaultPolicy) throw new Error('Vault credentials not found')

    if (vaultPolicy.userId !== viewer.userId) {
      throw new PermissionsError('unauthorized', {message: 'You dont have vault credentials'})
    }
  }
}
