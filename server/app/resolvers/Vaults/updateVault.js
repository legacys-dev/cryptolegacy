import {resolver, PermissionsError} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import VaultPolicies from 'app/collections/VaultPolicies'
import createActivity from 'app/resolvers/Activities/createActivity'
import {slugify} from 'app/helpers/parts'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    name: {
      type: String,
      label: 'Nombre de la bóveda'
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  async resolve({vaultId, name}, viewer) {
    const vault = await Vaults.findOne(vaultId)
    const vaultPolicies = await VaultPolicies.findOne({userId: viewer.userId, vaultId})

    if (isEmpty(vault)) throw new Error('Vault not found')
    if (isEmpty(vaultPolicies)) throw new Error('User vault not found')
    if (vaultPolicies.credentialType !== 'owner') {
      throw new PermissionsError('unauthorized', {
        message: 'User doesnt have the required permissions'
      })
    }

    if (vault.name === name) return true

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'updateVault',
      vaultName: vault.name,
      newVaultName: name,
      status: 'finished'
    }

    vault.update({$set: {name, searchSlug: slugify(name)}}) // await not necessary

    createActivity(activityTypeParams, viewer) // await not necessary

    return true
  }
})
