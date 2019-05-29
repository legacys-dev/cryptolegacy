import {resolver, PermissionsError} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import VaultCredentials from 'app/collections/VaultCredentials'
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
    const vaultCredentials = await VaultCredentials.findOne({userId: viewer.userId, vaultId})

    if (isEmpty(vault)) throw new Error('Vault not found')
    if (isEmpty(vaultCredentials)) throw new Error('User vault not found')
    if (vaultCredentials.credentialType !== 'owner') {
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

    await vault.update({$set: {name, searchSlug: slugify(name)}})

    await createActivity(activityTypeParams, viewer)

    return true
  }
})
