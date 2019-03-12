import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import passwordRegistration from 'app/helpers/registration/passwordRegistration'
import {DateTime} from 'luxon'

export default resolver({
  params: {
    code: {
      type: String,
      placeholder: 'Ingesa el código que enviamos a tu email'
    },
    token: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  async resolve({code, token}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 15})
      .toJSDate()
    const registration = await Registrations.findOne({
      'confirmEmail.code': code,
      'confirmEmail.token': token,
      'confirmEmail.date': {$gte: limitTime}
    })

    if (!registration) throw new Error('error confirming email')

    const updateDate = new Date()
    const confirmPassword = passwordRegistration()

    await Registrations.updateOne({_id: registration._id}, {$set: {confirmPassword, updateDate}})

    return confirmPassword.token
  }
})
