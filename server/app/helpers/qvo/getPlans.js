import {getData} from './connections'

export default async (email, name) => {
  try {
    return await getData('/plans')
  } catch (e) {
    console.log('error')
    return null
  }
}
