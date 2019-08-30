import { deleteData } from './connections'

export default async subscriptionId => {
  try {
    return deleteData(`subscriptions/${subscriptionId}`)
  } catch (e) {
    console.log('error')
    return null
  }
}
