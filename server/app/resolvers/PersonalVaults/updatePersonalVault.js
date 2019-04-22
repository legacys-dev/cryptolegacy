import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'
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
  requireLogin: true,
  returns: Boolean,
  mutation: true,
  async resolve({personalVaultId, name}, viewer) {
    const userVault = await PersonalVaults.findOne(personalVaultId)
    if (isEmpty(userVault)) throw new Error('User vault not found')
    if (!isEmpty(userVault.userId.localeCompare(viewer.userId))) throw new Error('not permissions')

    await userVault.update({$set: {name}})

    return true
  }
})
