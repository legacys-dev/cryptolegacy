import { resolver } from '@orion-js/app'
import Vaults from 'app/collections/Vaults'

export default resolver({
  params: {},
  returns: String,
  async resolve(vaultPolicy, params, viewer) {
    const vault = await Vaults.findOne({ _id: vaultPolicy.vaultId })
    return vault.name
  }
})
