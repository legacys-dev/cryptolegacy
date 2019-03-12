import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import Users from 'app/collections/Users'
import authResolvers from 'app/resolvers/Auth'
import {createSession} from '@orion-js/auth'
import {DateTime} from 'luxon'

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
  async resolve({password, confirmPassword, token}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 15})
      .toJSDate()
    const registration = await Registrations.findOne({
      'confirmPassword.token': token,
      'confirmPassword.date': {$gte: limitTime}
    })

    if (!registration) throw new Error('error creating password')
    if (password !== confirmPassword) throw new Error('error creating password')

    const {email, name, lastName} = registration.userData
    const profile = {firstName: name, lastName}

    const createUser = authResolvers.createUser
    await createUser({email, password, profile})

    const newUser = await Users.findOne({'emails.address': email})
    if (!newUser) throw new Error('Error creating user')

    return await createSession(newUser)
  }
})
