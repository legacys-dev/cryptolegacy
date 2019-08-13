import {resolver} from '@orion-js/app'
import {hasPassword, checkPassword} from 'app/helpers/authentication'
import {userDataEncryptWithPassword, createKeyPairs as generateCryptoKeys} from 'app/helpers/crypto'
import {generateUserCipherKeys} from 'app/helpers/keys'
import Users from 'app/collections/Users'
import getSession from './getSession'
import bcrypt from 'bcryptjs'
import createEmergencyKit from 'app/resolvers/EmergencyKits/createEmergencyKit'

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
        if (!user) return
        if (!hasPassword(user)) return 'noPassword'
        if (!checkPassword(user, password)) return 'incorrectPassword'
      }
    },
    masterKey: {
      type: String,
      async custom(masterKey, {doc}) {
        console.log("master key: ",masterKey)
        if (!masterKey) return 'masterKeyNotFound'
        if (masterKey.length !== 32) return 'invalidMasterKey'

        const user = await Users.findOne({'emails.address': doc.email})

        if (!user) return
        if (user.messageKeys) return 'errorKeysFoundOnLogin'
        if (!bcrypt.compareSync(masterKey, user.services.masterKey.bcrypt)) {
          return 'invalidMasterKey'
        }
      }
    },
    sharedHardware: {
      type: Boolean,
      optional: true
    }
  },
  returns: 'blackbox',
  mutation: true,
  async resolve({email, masterKey, password, sharedHardware}, viewer) {
    const user = await Users.findOne({'emails.address': email})

    const session = await getSession(user)

    let userMessageKeys
    if (session) {
      userMessageKeys = generateCryptoKeys()
      await user.update({$set: {messageKeys: {updatedAt: new Date(), ...userMessageKeys}}})
    }

    const userMasterPassword = await generateUserCipherKeys(masterKey)

    const {secret, iv} = userMasterPassword
    const encryptedKeysForMessages = userDataEncryptWithPassword({
      itemToEncrypt: JSON.stringify(userMessageKeys),
      cipherPassword: secret,
      userDataIv: iv
    })
    const {emergencyKitId} = await createEmergencyKit({
      userMasterKey:userMasterPassword,
      userId: user._id,
      email,
      userMessageKeys
    }, viewer)

    return {
      session,
      encryptedKeysForMessages
    }
  }
})
