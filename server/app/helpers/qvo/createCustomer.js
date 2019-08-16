import {postData} from './connections'

export default async (email, name) => {
  try {
    return await postData('customers', {
      email: email,
      name: name
    })
  } catch (e) {
    console.log('error')
    return null
  }
}
