import {resolver} from '@orion-js/app'
import {createSession} from '@orion-js/auth'
import {hasPassword, checkPassword} from 'app/helpers/authentication'
import {generateUserCipherKeys} from 'app/helpers/keys'
import {cipherDecrypt} from 'app/helpers/crypto'
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
        if (!user.privateData) return 'errorNotKeysFound'

        const {secret} = await generateUserCipherKeys(masterKey)
        const userData = JSON.parse(cipherDecrypt(user.privateData, secret, null, 'meta-data'))

        if (!userData) throw new Error('User private data not found')
        if (userData.userId !== user._id) return 'incorrectMasterKey'
      }
    }
  },
  returns: 'blackbox',
  mutation: true,
  async resolve({email, password}, viewer) {
    const user = await Users.findOne({'emails.address': email})
    const session = await createSession(user)

    return {
      session
    }
  }
})
