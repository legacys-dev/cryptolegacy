import {resolver} from '@orion-js/app'
import {createSession} from '@orion-js/auth'
import {hasPassword, checkPassword} from 'app/helpers/authentication'
import {generateUserKeys} from 'app/helpers/keys'
import Users from 'app/collections/Users'

export default resolver({
  params: {
    email: {
      type: 'email',
      label: 'Email',
      async custom(email) {
        const user = await Users.findOne({'emails.address': email})
        if (!user) return 'userNotFound'
      }
    },
    password: {
      type: String,
      label: 'Password',
      async custom(password, {doc}) {
        const user = await Users.findOne({'emails.address': doc.email})
        if (!user) return
        if (!hasPassword(user)) return 'noPassword'
        if (!checkPassword(user, password)) return 'incorrectPassword'
      }
    },
    masterKey: {
      type: String,
      label: 'Master Key',
      async custom(masterKey, {doc}) {
        if (!masterKey) return 'masterKeyNotFound'
        if (masterKey.length !== 32) return 'invalidMasterKey'

        const user = await Users.findOne({'emails.address': doc.email})
        if (!user.privateKeys) return 'errorNotKeysFound'

        const {secret, iv} = await generateUserKeys(masterKey)
        const {masterHash, secretKey, secretIv} = user.privateKeys

        const compare = masterHash !== masterKey || secretKey !== secret || secretIv !== iv
        if (compare) return 'incorrectMasterKey'
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
