import {generateId} from '@orion-js/app'

export default function({email, name, lastName}) {
  const registerData = {
    userData: {
      email: email.toLowerCase(),
      name,
      lastName
    },
    confirmEmail: {
      confirm: false,
      token: generateId(151),
      code: Math.random()
        .toString()
        .slice(2, 11)
        .toString(),
      date: new Date()
    },
    updateDate: new Date()
  }

  return registerData
}
