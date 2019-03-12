import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import UserData from 'app/models/Registration/UserData'
import Users from 'app/collections/Users'
import emailRegistration from 'app/helpers/registration/emailRegistration'

export default resolver({
  params: UserData.clone({omitFields: []}),
  returns: String,
  mutation: true,
  async resolve(params, viewer) {
    const {email} = params
    const user = await Users.findOne({'email.address': email})
    if (user) throw new Error('email already exists')

    const dataForRegister = emailRegistration(params)
    await Registrations.updateOne(
      {'userData.email': email},
      {$set: dataForRegister},
      {upsert: true}
    )

    // send code by mail to confirm
    console.log('digits:', dataForRegister.confirmEmail.code)

    return dataForRegister.confirmEmail.token
  }
})
