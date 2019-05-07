import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'

export default resolver({
  params: {},
  returns: Number,
  async resolve(personalVault, params, viewer) {
    const query = {userVaultId: personalVault._id, userId: viewer.userId}
    const files = await Files.find(query).toArray()
    return files.reduce((sum, file) => sum + file.s3Data.size, 0)
  }
})
