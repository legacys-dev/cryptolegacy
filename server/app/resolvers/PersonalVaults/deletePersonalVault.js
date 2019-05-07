import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'

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
    await PersonalVaults.remove({_id: personalVaultId})
    return true
  }
})
