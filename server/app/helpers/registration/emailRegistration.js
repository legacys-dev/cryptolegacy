import { generateId } from '@orion-js/app'
import { hashPassword } from '@orion-js/auth'
import isEmpty from 'lodash/isEmpty'

export default function({ email, name, lastName }) {
  const missingData = isEmpty(email) || isEmpty(name) || isEmpty(lastName)
  if (missingData) throw new Error('Missing user data for register email')

  const verifyCode = Math.random()
    .toString()
    .slice(2, 11)

  const userRegisterData = {
    userInformation: {
      email: email.toLowerCase(),
      name,
      lastName
    },
    confirmEmail: {
      confirm: false,
      token: generateId(201),
      date: new Date(),
      code: { bcrypt: hashPassword(verifyCode) }
    },
    updateDate: new Date()
  }

  return {
    verifyCode,
    userRegisterData
  }
}
