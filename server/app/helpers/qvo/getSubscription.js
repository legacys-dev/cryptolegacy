import {getData} from './connections'

export default async subscriptionId => {
  try {
    return await getData(`subscriptions/${subscriptionId}`)
  } catch (e) {
    console.log('error')
    return null
  }
}
