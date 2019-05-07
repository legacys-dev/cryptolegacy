import {resolver} from '@orion-js/app'
import filesVaultUpdated from 'app/subscriptions/PersonalVaults/filesVaultUpdated'
import PersonalVaults from 'app/collections/PersonalVaults'

export default resolver({
  params: {},
  returns: Boolean,
  private: true,
  async resolve(file, params, viewer) {
    const userVault = await PersonalVaults.findOne({_id: file.userVaultId})
    await filesVaultUpdated({personalVaultId: file.userVaultId}, userVault)
    return true
  }
})
