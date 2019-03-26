import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import Users from 'app/collections/Users'
import authResolvers from 'app/resolvers/Auth'
import {createSession} from '@orion-js/auth'

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

    const createUser = authResolvers.createUser
    await createUser({email, password, profile})

    const newUser = await Users.findOne({'emails.address': email})

    if (!newUser) throw new Error('Error creating user')

    await Users.update(
      {_id: newUser._id, 'emails.address': email},
      {
        $set: {'emails.$.verified': true},
        $unset: {'services.emailVerify': ''}
      }
    )

    return await createSession(newUser)
  }
})
