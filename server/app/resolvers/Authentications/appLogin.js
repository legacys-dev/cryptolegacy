import {resolver} from '@orion-js/app'
import {createSession} from '@orion-js/auth'
import {hasPassword, checkPassword} from 'app/helpers/authentication'
import {generateUserCipherKeys} from 'app/helpers/keys'
import {cipherEncrypt} from 'app/helpers/crypto'
import Users from 'app/collections/Users'
import bcrypt from 'bcryptjs'

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

        if (!user.messageKeys) return 'errorNotKeysFound'
        if (!bcrypt.compareSync(masterKey, user.services.masterKey.bcrypt)) {
          return 'invalidMasterKey'
        }
      }
    }
  },
  returns: 'blackbox',
  mutation: true,
  async resolve({email, masterKey, password}, viewer) {
    const user = await Users.findOne({'emails.address': email})
    const session = await createSession(user)

    const userMessageKeys = {
      publicKey: user.messageKeys.publicKey,
      privateKey: user.messageKeys.privateKey,
      passphrase: user.messageKeys.passphrase
    }

    const userMasterPassword = await generateUserCipherKeys(masterKey)

    const {secret} = userMasterPassword
    const encryptedKeysForMessages = cipherEncrypt(
      JSON.stringify(userMessageKeys),
      secret,
      null,
      'meta-data'
    )

    return {
      session,
      encryptedKeysForMessages
    }
  }
})
