import {getData} from './connections'

export default async customerId => {
  try {
    return await getData(`customers/${customerId}`)
  } catch (e) {
    console.log('error')
    return null
  }
}
