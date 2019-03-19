import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import passwordRegistration from 'app/helpers/registration/passwordRegistration'
import {DateTime} from 'luxon'

export default resolver({
  params: {
    code: {
      type: String,
      placeholder: 'Código de 9 dígitos',
      description: 'Tienes 4 minutos para ingresar el código o tendrás que empezar denuevo'
    },
    token: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  async resolve({code, token}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 4})
      .toJSDate()

    const registration = await Registrations.findOne({
      'confirmEmail.code': code,
      'confirmEmail.token': token,
      'confirmEmail.date': {$gte: limitTime}
    })

    if (!registration) throw new Error('error confirming email. (code error or expired token)')

    const updateDate = new Date()
    const confirmPassword = passwordRegistration()

    await registration.update({$set: {confirmPassword, updateDate}})

    return confirmPassword.token
  }
})
