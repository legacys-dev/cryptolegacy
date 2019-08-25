import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import publicEncrypt from 'app/helpers/crypto/publicEncrypt'

export default resolver({
  params: {},
  returns: String,
  async resolve(vault, params, viewer) {
    const data = {
      name: vault.name,
      createdAt: vault.createdAt,
      fileCount: await vault.fileCount(),
      storageUsed: await vault.storageUsed(),
      storageType: await vault.storageType()
    }

    const user = await Users.findOne({_id: viewer.userId})
    const {publicKey} = user.messageKeys
    const encryptData = publicEncrypt({toEncrypt: data, publicKey})

    return encryptData
  }
})
