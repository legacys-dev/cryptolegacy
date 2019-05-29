import {resolver} from '@orion-js/app'
import {createSession, hashPassword} from '@orion-js/auth'
import {createMasterHash, generateUserCipherKeys, decomposeMasterKey} from 'app/helpers/keys'
import {generateKeys as generateOpenPgpKeys} from 'app/helpers/openPgp'
import {passwordValidator} from 'app/helpers/registration'
import {accountCreated} from 'app/helpers/emails'
import {cipherEncrypt} from 'app/helpers/crypto'
import Registrations from 'app/collections/Registrations'
import createEmergencyKit from './createEmergencyKit'
import authResolvers from 'app/resolvers/Auth'
import Users from 'app/collections/Users'
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
        if (!isEmpty(confirmPassword.localeCompare(doc.password))) return 'passwordNotMatch'
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

    const {email, name, lastName} = registration.userData
    const profile = {firstName: name, lastName}

    const userMasterHash = createMasterHash()
    const temporaryUserMasterHash = createMasterHash()
    const userMasterPassword = await generateUserCipherKeys(temporaryUserMasterHash.masterKey)
    const userMessageKeys = await generateOpenPgpKeys()

    const invalidKeys =
      isEmpty(userMasterHash) ||
      isEmpty(userMasterHash.masterKey) ||
      isEmpty(userMasterPassword) ||
      isEmpty(userMessageKeys)

    if (invalidKeys) throw new Error('Error creating user')

    const {createUser} = authResolvers
    await createUser({email, password, profile})

    const newUser = await Users.findOne({'emails.address': email})

    if (!newUser) throw new Error('Error creating user')

    const {secret} = userMasterPassword
    const encryptedKeysForMessages = cipherEncrypt(
      JSON.stringify(userMessageKeys),
      secret,
      null,
      'meta-data'
    )

    await Users.update(
      {_id: newUser._id, 'emails.address': email},
      {
        $set: {
          'services.masterKey.bcrypt': hashPassword(userMasterHash.masterKey),
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

    const {emergencyKitId, emergencyKey} = await createEmergencyKit({
      userMasterHash,
      userId: newUser._id,
      email
    })

    const k = decomposeMasterKey({
      masterKey: temporaryUserMasterHash.masterKey,
      userId: newUser._id
    })

    const {userData} = registration
    await accountCreated({userData})

    return {
      session,
      emergencyKitId,
      emergencyKey,
      encryptedKeysForMessages,
      k
    }
  }
})
