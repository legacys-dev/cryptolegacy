import { resolver } from '@orion-js/app'
import Vaults from 'app/collections/Vaults'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const vault = await Vaults.findOne({ _id: file.vaultId })
    return vault.name
  }
})
