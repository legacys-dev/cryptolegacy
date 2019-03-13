import {resolver} from '@orion-js/app'
import Registrations from 'app/collections/Registrations'
import {DateTime} from 'luxon'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    regisToken: {
      type: String
    }
  },
  returns: Boolean,
  async resolve({regisToken}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 4})
      .toJSDate()

    const registrations = await Registrations.find({
      $or: [
        {
          'confirmEmail.token': regisToken,
          'confirmEmail.date': {$gte: limitTime}
        },
        {
          'confirmPassword.token': regisToken,
          'confirmPassword.date': {$gte: limitTime}
        }
      ]
    }).toArray()

    if (isEmpty(registrations)) return false
    return true
  }
})
