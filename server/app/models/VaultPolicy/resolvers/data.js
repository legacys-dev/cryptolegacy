import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import publicEncrypt from 'app/helpers/crypto/publicEncrypt'

export default resolver({
  params: {},
  returns: String,
  async resolve(vaultPolicy, params, viewer) {
    const data = {
      vaultPolicyId: vaultPolicy._id,
      userId: vaultPolicy.userId,
      vaultId: vaultPolicy.vaultId,
      vaultName: await vaultPolicy.vaultName(),
      userEmail: vaultPolicy.userEmail,
      createdAt: vaultPolicy.createdAt,
      status: vaultPolicy.status
    }

    const user = await Users.findOne({ _id: viewer.userId })
    console.log({ user })
    const { publicKey } = user.messageKeys
    const encryptData = publicEncrypt({ toEncrypt: data, publicKey })

    return encryptData
  }
})
