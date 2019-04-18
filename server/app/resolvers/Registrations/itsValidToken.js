import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import isEmpty from 'lodash/isEmpty'
import {DateTime} from 'luxon'

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

    return !isEmpty(registrations)
  }
})
