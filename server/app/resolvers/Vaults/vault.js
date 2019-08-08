import {resolver} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import Vault from 'app/models/Vault'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    }
  },
  vaultAccess: true,
  requireLogin: true,
  returns: Vault,
  async resolve({vaultId}, viewer) {
    const vault =  await Vaults.findOne(vaultId)
    console.log({vault});
    return vault
    
  }
})
