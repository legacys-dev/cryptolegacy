import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import passwordRegistration from 'app/helpers/registration/passwordRegistration'

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
  confirmEmailPermission: true,
  async resolve({code, token}, viewer) {
    const registration = await Registrations.findOne({
      'confirmEmail.code': code,
      'confirmEmail.token': token
    })

    const updateDate = new Date()
    const confirmPassword = passwordRegistration()

    await registration.update({$set: {confirmPassword, updateDate}})

    return confirmPassword.token
  }
})
