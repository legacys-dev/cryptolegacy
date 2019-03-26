import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import UserData from 'app/models/Registration/UserData'
import emailRegistration from 'app/helpers/registration/emailRegistration'

export default resolver({
  params: UserData.clone({omitFields: []}),
  returns: String,
  mutation: true,
  emailRegisterPermission: true,
  async resolve(params, viewer) {
    const dataForRegister = emailRegistration(params)
    const register = await Registrations.findOne({'userData.email': params.email.toLowerCase()})

    if (register) await register.update({$set: dataForRegister})
    else await Registrations.insert(dataForRegister)

    // send code by mail to confirm
    console.log('digits:', dataForRegister.confirmEmail.code)

    return dataForRegister.confirmEmail.token
  }
})
