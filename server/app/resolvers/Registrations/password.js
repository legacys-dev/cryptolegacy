import {resolver} from '@orion-js/app'
import {createSession} from '@orion-js/auth'
import Registrations from 'app/collections/Registrations'
import Users from 'app/collections/Users'
import authResolvers from 'app/resolvers/Auth'
import {createMasterHash, generateUserCipherKeys, createKeyPairs} from 'app/helpers/keys'
import {cipherEncrypt} from 'app/helpers/crypto'
import {passwordValidator} from 'app/helpers/registration'
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
    const userMasterKeys = await generateUserCipherKeys(userMasterHash.masterKey)
    const userPrivateInformation = createKeyPairs()

    const {createUser} = authResolvers
    await createUser({email, password, profile})

    const newUser = await Users.findOne({'emails.address': email})

    if (!newUser) throw new Error('Error creating user')

    userPrivateInformation.userId = newUser._id
    const {secret} = userMasterKeys
    const encryptedContent = cipherEncrypt(
      JSON.stringify(userPrivateInformation),
      secret,
      null,
      'meta-data'
    )

    await Users.update(
      {_id: newUser._id, 'emails.address': email},
      {
        $set: {
          privateData: encryptedContent,
          'emails.$.verified': true
        },
        $unset: {'services.emailVerify': ''}
      }
    )

    const session = await createSession(newUser)

    return {
      session
    }
  }
})
