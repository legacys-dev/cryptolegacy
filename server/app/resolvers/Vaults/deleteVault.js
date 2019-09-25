import { resolver } from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import createActivity from 'app/resolvers/Activities/createActivity'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  vaultForDelete: true,
  async resolve({ vaultId }, viewer) {
    const vault = await Vaults.findOne(vaultId)
    if (!vault) return

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'deleteVault',
      vaultName: vault.name,
      status: 'finished'
    }

    createActivity(activityTypeParams, viewer) // await not necessary

    vault.remove() // await not necessary

    return true
  }
})
