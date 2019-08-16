import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import publicEncrypt from 'app/helpers/crypto/publicEncrypt'

export default resolver({
  params: {},
  returns: String,
  async resolve(file, params, viewer) {
    const data = {
      name: file.name,
      type: file.type,
      size: file.s3Data.size,
      vaultId: file.vaultId,
      vaultName:  await file.vaultName(),
      storageType: file.storage,
      status: file.status,
      createdAt: file.createdAt
    }
    const user = await Users.findOne({_id: viewer.userId})
    const {publicKey} = user.messageKeys
    const encryptData = publicEncrypt({toEncrypt: data, publicKey})

    return encryptData
  }
})
