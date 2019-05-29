import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'

export default resolver({
  params: {},
  returns: Number,
  async resolve(vault, params, viewer) {
    const query = {vaultId: vault._id, status: 'active'}
    const files = await Files.find(query).toArray()
    return files.reduce((sum, file) => sum + file.s3Data.size, 0)
  }
})
