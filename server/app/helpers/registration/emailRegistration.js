import {generateId} from '@orion-js/app'

export default function({email, name, lastName}) {
  const registerData = {
    _id: generateId(),
    userData: {
      email,
      name,
      lastName
    },
    confirmEmail: {
      confirm: false,
      token: `${generateId()}-${generateId()}-${generateId()}`,
      code: Math.random()
        .toString()
        .slice(2, 11)
        .toString(),
      date: new Date()
    },
    confirmPassword: null,
    updateDate: new Date()
  }

  return registerData
}
