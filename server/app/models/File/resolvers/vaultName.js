import {resolver} from '@orion-js/app'
import PersonalVaults from 'app/collections/PersonalVaults'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const vault = await PersonalVaults.findOne({_id: file.userVaultId})
    return vault.name
  }
})
