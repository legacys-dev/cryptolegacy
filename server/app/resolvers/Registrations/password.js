import {resolver} from '@orion-js/app'
import {createSession} from '@orion-js/auth'
import Registrations from 'app/collections/Registrations'
import Users from 'app/collections/Users'
import authResolvers from 'app/resolvers/Auth'
import createHash from 'app/helpers/keys/createMasterHash'
import createKeys from 'app/helpers/keys/createUserKeys'

export default resolver({
  params: {
    password: {
      type: String
    },
    confirmPassword: {
      type: String
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

    const userMasterHash = createHash()
    const userMasterKeys = await createKeys(userMasterHash.masterKey)

    const createUser = authResolvers.createUser
    await createUser({email, password, profile})

    const newUser = await Users.findOne({'emails.address': email})

    if (!newUser) throw new Error('Error creating user')

    await Users.update(
      {_id: newUser._id, 'emails.address': email},
      {
        $set: {
          'privateKeys.masterHash': userMasterHash.masterKey,
          'privateKeys.secretKey': userMasterKeys.secret,
          'privateKeys.secretIv': userMasterKeys.iv,
          'emails.$.verified': true
        },
        $unset: {'services.emailVerify': ''}
      }
    )

    const session = await createSession(newUser)

    return {
      ums: userMasterKeys.secret,
      umi: userMasterKeys.iv,
      session
    }
  }
})
