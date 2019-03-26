import Users from 'app/collections/Users'
import emailTest from 'app/helpers/registration/emailTest'

export default async function({viewer, email, name, lastName}) {
  if (!email) throw new Error('Email required')

  if (!emailTest(email)) throw new Error('Email is not valid')

  if (!name) throw new Error('Name required')

  if (!lastName) throw new Error('Lastname required')

  const user = await Users.findOne({'email.address': email})

  if (user) throw new Error('Email already exists')
}
