import { createSession } from '@orion-js/auth'

export default async function(user) {
  let session

  try {
    session = await createSession(user)
  } catch (error) {
    console.log(error)
    throw new Error('Error creating session on user login')
  }

  return session
}
