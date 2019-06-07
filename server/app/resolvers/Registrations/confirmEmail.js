import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import {passwordRegistration} from 'app/helpers/registration'

export default resolver({
  params: {
    code: {
      type: String,
      placeholder: 'Código de 9 dígitos',
      description: 'Se ha enviado un código a tu email para confirmar. Tienes 4 minutos.',
      async custom(code) {
        if (isNaN(parseInt(code, 10))) return 'invalidCode'
      }
    },
    token: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  confirmEmailPermission: true,
  async resolve({code, token}, viewer) {
    const query = {
      'confirmEmail.token': token
    }

    const updateDate = new Date()
    const confirmPassword = passwordRegistration()

    await Registrations.update(query, {$set: {confirmPassword, updateDate}})

    return confirmPassword.token
  }
})
