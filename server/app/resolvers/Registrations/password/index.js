import {resolver} from '@orion-js/app'
import {createSession, hashPassword} from '@orion-js/auth'
import {createMasterKey, generateUserCipherKeys, decomposeMasterKey} from 'app/helpers/keys'
import {userDataEncryptWithPassword, createKeyPairs as generateCryptoKeys} from 'app/helpers/crypto'
import {passwordValidator} from 'app/helpers/registration'
import {accountCreated} from 'app/helpers/emails'
import Registrations from 'app/collections/Registrations'
import Users from 'app/collections/Users'
import createEmergencyKit from 'app/resolvers/EmergencyKit/createEmergencyKit'
import authResolvers from 'app/resolvers/Auth'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    password: {
      type: String,
      async custom(password) {
        const result = passwordValidator(password)
        if (result) return result.message
      }
    },
    confirmPassword: {
      type: String,
      async custom(confirmPassword, doc) {
        if (confirmPassword.localeCompare(doc.doc.password)) return 'passwordNotMatch'
        const result = passwordValidator(confirmPassword)
        if (result) return result.message
      }
    },
    token: {
      type: String
    }
  },
  returns: 'blackbox',
  mutation: true,
  userCreatePermission: true,
  async resolve({password, confirmPassword, token}, viewer) {
    const registration = await Registrations.findOne({'confirmPassword.token': token})

    const {email, name, lastName} = registration.userInformation
    const profile = {firstName: name, lastName}

    const userMasterKey = createMasterKey()
    const temporaryUserMasterKey = createMasterKey()
    const userMessageKeys = generateCryptoKeys()
    const temporaryUserMasterPassword = await generateUserCipherKeys(
      temporaryUserMasterKey.original
    )

    const invalidKeys =
      isEmpty(userMasterKey) ||
      isEmpty(userMasterKey.original) ||
      isEmpty(temporaryUserMasterPassword) ||
      isEmpty(userMessageKeys)

    if (invalidKeys) throw new Error('Error creating user')

    const {createUser} = authResolvers
    await createUser({email, password, profile})

    const newUser = await Users.findOne({'emails.address': email})

    if (!newUser) throw new Error('Error creating user')

    const {secret, iv} = temporaryUserMasterPassword
    const encryptedKeysForMessages = userDataEncryptWithPassword({
      itemToEncrypt: JSON.stringify(userMessageKeys),
      cipherPassword: secret,
      userDataIv: iv
    })

    await Users.update(
      {_id: newUser._id, 'emails.address': email},
      {
        $set: {
          'services.masterKey.bcrypt': hashPassword(userMasterKey.original),
          'services.masterKey.createdAt': new Date(),
          'messageKeys.publicKey': userMessageKeys.publicKey,
          'messageKeys.privateKey': userMessageKeys.privateKey,
          'messageKeys.passphrase': userMessageKeys.passphrase,
          'emails.$.verified': true
        },
        $unset: {'services.emailVerify': ''}
      }
    )

    const session = await createSession(newUser)

    const userKeyObject = {original: userMasterKey.original}
    const {emergencyKitId} = await createEmergencyKit(
      {
        userMasterKey: userKeyObject,
        userId: newUser._id,
        email,
        userMessageKeys
      },
      viewer
    )

    const k = decomposeMasterKey({
      masterKey: temporaryUserMasterKey.original,
      userId: newUser._id
    })

    const {userInformation} = registration
    accountCreated({userInformation}) // await not necessary

    return {
      session,
      emergencyKitId,
      encryptedKeysForMessages,
      k
    }
  }
})
