import {resolver} from '@orion-js/app'
import {createSession} from '@orion-js/auth'
import {hasPassword, checkPassword} from 'app/helpers/authentication'
import Users from 'app/collections/Users'
import getUserKeys from 'app/helpers/keys/createUserKeys'

export default resolver({
  params: {
    email: {
      type: 'email',
      async custom(email) {
        const user = await Users.findOne({'emails.address': email})
        if (!user) return 'userNotFound'
      }
    },
    password: {
      type: String,
      async custom(password, {doc}) {
        const user = await Users.findOne({'emails.address': doc.email})
        if (!user) return 'userNotFound'
        if (!hasPassword(user)) return 'noPassword'
        if (!checkPassword(user, password)) return 'incorrectPassword'
      }
    },
    masterKey: {
      type: 'ID',
      async custom(masterKey, {doc}) {
        if (!masterKey) return 'masterKeyNotFound'
        if (masterKey.length !== 32) return 'invalidMasterKey'

        const user = await Users.findOne({'emails.address': doc.email})
        if (!user) return 'userNotFound'
        if (!user.privateKeys) return 'error'

        const {secret, iv} = await getUserKeys(masterKey)
        const {masterHash, secretKey, secretIv} = user.privateKeys
        if (masterHash !== masterKey) return 'error'
        if (secretKey !== secret) return 'error'
        if (secretIv !== iv) return 'error'
      }
    }
  },
  returns: 'blackbox',
  mutation: true,
  async resolve({email, password}, viewer) {
    const user = await Users.findOne({'emails.address': email})
    const session = await createSession(user)
    const {secretKey, secretIv} = user.privateKeys

    return {
      session,
      umk: secretKey,
      umi: secretIv
    }
  }
})
