import { resolver } from '@orion-js/app'
import { getSubscription } from 'app/helpers/qvo'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(user, params, viewer) {
    if (!user.qvo.subscriptionId) return {}

    let plan

    try {
      plan = await getSubscription(user.qvo.subscriptionId)
    } catch (error) {
      console.log('Error:', error)
      return {}
    }

    return {
      status: plan.status,
      startDate: new Date(plan.current_period_start),
      renovationDate: new Date(plan.current_period_end),
      plan: plan.plan.name,
      price: plan.plan.price,
      currency: plan.plan.currency
    }
  }
})
