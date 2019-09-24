import { resolver } from '@orion-js/app'
import filesVaultUpdated from 'app/subscriptions/Vaults/filesVaultUpdated'
import Vaults from 'app/collections/Vaults'

export default resolver({
  params: {},
  returns: Boolean,
  private: true,
  async resolve(file, params, viewer) {
    const userVault = await Vaults.findOne({ _id: file.vaultId })
    await filesVaultUpdated({ vaultId: file.vaultId }, userVault)

    return true
  }
})
