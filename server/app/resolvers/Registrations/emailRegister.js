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
    const query = {'userData.email': params.email.toLowerCase()}
    const dataForRegister = emailRegistration(params)
    const register = await Registrations.findOne(query)

    if (register) await Registrations.update(query, {$set: dataForRegister})
    else await Registrations.insert(dataForRegister)

    // send code by mail to confirm
    console.log('digits:', dataForRegister.confirmEmail.code)

    return dataForRegister.confirmEmail.token
  }
})
