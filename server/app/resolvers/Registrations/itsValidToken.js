import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import {DateTime} from 'luxon'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    registerToken: {
      type: String
    }
  },
  returns: Boolean,
  async resolve({registerToken}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 4})
      .toJSDate()

    const registrations = await Registrations.find({
      $or: [
        {
          'confirmEmail.token': registerToken,
          'confirmEmail.date': {$gte: limitTime}
        },
        {
          'confirmPassword.token': registerToken,
          'confirmPassword.date': {$gte: limitTime}
        }
      ]
    }).toArray()

    if (isEmpty(registrations)) return false
    return true
  }
})
