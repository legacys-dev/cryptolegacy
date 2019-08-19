import {postData} from './connections'

export default async (customerId, planId) => {
  try {
    return await postData('subscriptions', {
      customer_id: customerId,
      plan_id: planId
    })
  } catch (e) {
    console.log('error')
    return null
  }
}
