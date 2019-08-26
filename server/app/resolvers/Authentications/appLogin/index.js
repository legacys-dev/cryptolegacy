import {resolver, generateId} from '@orion-js/app'
import {hasPassword, checkPassword} from 'app/helpers/authentication'
import {userDataEncryptWithPassword, createKeyPairs as generateCryptoKeys} from 'app/helpers/crypto'
import createEmergencyKit from 'app/resolvers/EmergencyKit/createEmergencyKit'
import {generateUserCipherKeys} from 'app/helpers/keys'
import Users from 'app/collections/Users'
import getSession from './getSession'
import bcrypt from 'bcryptjs'

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
    let communicationPassword
    if (session) {
      userMessageKeys = generateCryptoKeys()
      communicationPassword = generateId(32)
      await user.update({
        $set: {
          messageKeys: {updatedAt: new Date(), ...userMessageKeys},
          communicationPassword
        }
      })
    }

    const userMasterPassword = await generateUserCipherKeys(masterKey)

    const {secret, iv} = userMasterPassword
    const encryptedKeysForMessages = userDataEncryptWithPassword({
      itemToEncrypt: JSON.stringify({...userMessageKeys, communicationPassword}),
      cipherPassword: secret,
      userDataIv: iv
    })

    const userKeyObject = {original: masterKey}
    await createEmergencyKit(
      {
        userMasterKey: userKeyObject,
        userId: user._id,
        email,
        userMessageKeys
      },
      viewer
    )

    return {
      session,
      encryptedKeysForMessages
    }
  }
})
