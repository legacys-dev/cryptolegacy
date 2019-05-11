import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'
import createActivity from 'app/resolvers/Activities/createActivity'

export default resolver({
  params: {
    personalVaultId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  vaultOwner: true,
  personalVaultForDelete: true,
  async resolve({personalVaultId}, viewer) {
    const personalVault = await PersonalVaults.findOne(personalVaultId)
    if (!personalVault) return

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'deleteVault',
      vaultName: personalVault.name,
      status: 'finished'
    }

    await createActivity(activityTypeParams, viewer)

    await personalVault.remove()

    return true
  }
})
