import { resolver } from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import { emailRegistration, emailValidator } from 'app/helpers/registration'
import { verifyEmail } from 'app/helpers/emails'
import Users from 'app/collections/Users'

export default resolver({
  params: {
    email: {
      type: String,
      async custom(email) {
        email = email.toLowerCase()
        if (!emailValidator(email)) return 'invalidEmail'
        const user = await Users.findOne({ 'emails.address': email })
        if (user) return 'emailAlreadyExists'
      }
    },
    name: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  emailRegisterPermission: true,
  async resolve(params, viewer) {
    const query = { 'userInformation.email': params.email.toLowerCase() }
    const { verifyCode, userRegisterData } = emailRegistration(params)
    const register = await Registrations.findOne(query)

    if (register) await register.update({ $set: userRegisterData })
    else await Registrations.insert(userRegisterData)

    verifyEmail({ registerData: { verifyCode, ...userRegisterData } }) // await not necessary

    if (process.env.ORION_LOCAL) console.log('digits:', verifyCode)

    return userRegisterData.confirmEmail.token
  }
})
