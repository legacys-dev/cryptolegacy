import Registrations from 'app/collections/Registrations'
import isEmpty from 'lodash/isEmpty'
import { DateTime } from 'luxon'

export default async function({ viewer, password, confirmPassword, token }) {
  if (!password) throw new Error('Error, passowrd required')

  if (!confirmPassword) throw new Error('Error, confirm password required')

  if (!token) throw new Error('Error creating password')

  const limitTime = DateTime.local()
    .minus({ minutes: 4 })
    .toJSDate()

  const registration = await Registrations.findOne({
    'confirmPassword.token': token,
    'confirmPassword.date': { $gte: limitTime }
  })

  if (isEmpty(registration)) throw new Error('error creating password. (expired token)')
}
