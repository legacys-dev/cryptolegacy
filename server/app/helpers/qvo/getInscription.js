import { getData } from './connections'

export default async (customerId, subscriptionUid) => {
  try {
    return await getData(`customers/${customerId}/cards/inscriptions/${subscriptionUid}`)
  } catch (e) {
    console.log('error')
    return null
  }
}
