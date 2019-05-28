import {resolver} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(heritage, params, viewer) {
    const vault = await Vaults.findOne({_id: heritage.vaultId})

    return {
      heritageId: heritage._id,
      vaultId: heritage.vaultId,
      vaultName: vault.name,
      inheritorEmail: heritage.inheritorEmail,
      createdAt: heritage.createdAt
    }
  }
})
