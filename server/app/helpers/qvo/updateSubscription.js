import { putData } from './connections'

export default async (subscriptionId, planId) => {
  try {
    return await putData(`subscriptions/${subscriptionId}`, {
      plan_id: planId
    })
  } catch (e) {
    console.log('error')
    return null
  }
}
