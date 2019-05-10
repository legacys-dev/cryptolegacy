import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'
import createActivity from 'app/resolvers/Activities/createActivity'
import {slugify} from 'app/helpers/parts'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    personalVaultId: {
      type: 'ID'
    },
    name: {
      type: String,
      label: 'Nombre de la bóveda'
    }
  },
  vaultOwner: true,
  requireLogin: true,
  returns: Boolean,
  mutation: true,
  async resolve({personalVaultId, name}, viewer) {
    const userVault = await PersonalVaults.findOne(personalVaultId)
    if (isEmpty(userVault)) throw new Error('User vault not found')
    if (!isEmpty(userVault.userId.localeCompare(viewer.userId))) throw new Error('not permissions')

    if (userVault.name === name) return true

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'updateVault',
      vaultName: userVault.name,
      newVaultName: name,
      status: 'finished'
    }

    await userVault.update({$set: {name, searchSlug: slugify(name)}})

    await createActivity(activityTypeParams, viewer)

    return true
  }
})
