import Registrations from 'app/collections/Registrations'
import isEmpty from 'lodash/isEmpty'
import {DateTime} from 'luxon'

export default async function({viewer, code, token}) {
  if (!code) throw new Error('Verification code required')

  if (!token) throw new Error('Verification token required')

  const limitTime = DateTime.local()
    .minus({minutes: 4})
    .toJSDate()

  const registration = await Registrations.findOne({
    'confirmEmail.code': code,
    'confirmEmail.token': token,
    'confirmEmail.date': {$gte: limitTime}
  })

  if (isEmpty(registration)) {
    throw new Error('error confirming email. (code error or expired token)')
  }
}
