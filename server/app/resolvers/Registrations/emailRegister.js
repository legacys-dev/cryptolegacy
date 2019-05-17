import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import {emailRegistration, emailTest} from 'app/helpers/registration'
import {verifyEmail} from 'app/helpers/emails'
import Users from 'app/collections/Users'

export default resolver({
  params: {
    email: {
      type: String,
      placeholder: 'Email',
      async custom(email) {
        email = email.toLowerCase()
        if (!emailTest(email)) return 'invalidEmail'
        const user = await Users.findOne({'emails.address': email})
        if (user) return 'emailAlreadyExists'
      }
    },
    name: {
      type: String,
      placeholder: 'Nombre'
    },
    lastName: {
      type: String,
      placeholder: 'Apellido'
    }
  },
  returns: String,
  mutation: true,
  emailRegisterPermission: true,
  async resolve(params, viewer) {
    const query = {'userData.email': params.email.toLowerCase()}
    const dataForRegister = emailRegistration(params)
    const register = await Registrations.findOne(query)

    if (register) await register.update({$set: dataForRegister})
    else await Registrations.insert(dataForRegister)

    // send code by mail to confirm
    console.log('digits:', dataForRegister.confirmEmail.code)
    await verifyEmail({registerData: dataForRegister})

    return dataForRegister.confirmEmail.token
  }
})
