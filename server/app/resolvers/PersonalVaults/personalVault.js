import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'
import PersonalVault from 'app/models/PersonalVault'

export default resolver({
  params: {
    personalVaultId: {
      type: 'ID'
    }
  },
  requireLogin: true,
  returns: PersonalVault,
  async resolve({personalVaultId}, viewer) {
    return await PersonalVaults.findOne(personalVaultId)
  }
})
