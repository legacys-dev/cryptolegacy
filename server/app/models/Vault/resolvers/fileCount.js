import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'

export default resolver({
  params: {},
  returns: Number,
  async resolve(vault, params, viewer) {
    const query = {vaultId: vault._id, status: 'active'}
    const result = await Files.find(query).toArray()
    return result.length
  }
})
