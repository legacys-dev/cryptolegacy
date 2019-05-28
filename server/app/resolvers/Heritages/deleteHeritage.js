import {resolver, PermissionsError} from '@orion-js/app'
import Heritages from 'app/collections/Heritages'

export default resolver({
  params: {
    heritageId: {
      type: 'ID'
    },
    vaultId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  vaultOwner: true,
  requireLogin: true,
  async resolve({heritageId, vaultId}, viewer) {
    const heritage = await Heritages.findOne({_id: heritageId, vaultId, status: 'waiting'})

    if (!heritage) throw new Error('Heritage not found')
    if (heritage.userId !== viewer.userId) {
      throw new PermissionsError('unauthorized', {
        message: 'You dont have permissions to access this heritage'
      })
    }

    await heritage.remove()

    return true
  }
})
