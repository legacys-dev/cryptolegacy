import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'

export default resolver({
  params: {
    personalVaultId: {
      type: 'ID'
    }
  },
  requireLogin: true,
  returns: String,
  async resolve({personalVaultId}, viewer) {
    return await PersonalVaults.findOne(personalVaultId)
  }
})
