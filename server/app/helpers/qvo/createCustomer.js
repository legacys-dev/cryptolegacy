import { postData } from './connections'

export default async (email, name) => {
  try {
    return postData('customers', {
      email: email,
      name: name
    })
  } catch (e) {
    console.log('error: ', e)
    return null
  }
}
