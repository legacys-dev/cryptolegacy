import { getData } from './connections'

export default async customerId => {
  try {
    return getData(`customers/${customerId}`)
  } catch (e) {
    console.log('error')
    return null
  }
}
