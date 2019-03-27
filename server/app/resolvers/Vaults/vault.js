import {resolver} from '@orion-js/app'
import Vault from 'app/models/Vault'
import Vaults from 'app/collections/Vaults'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    }
  },
  returns: Vault,
  async resolve({vaultId}, viewer) {
    return await Vaults.findOne(vaultId)
  }
})
