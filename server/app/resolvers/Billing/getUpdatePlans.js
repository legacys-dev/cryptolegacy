import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import {createSubscription, getPlans} from 'app/helpers/qvo'

export default resolver({
  params: {},
  returns: Array,
  requireLogin: true,
  async resolve(params, viewer) {
    try {
      const user = await Users.findOne({_id: viewer.userId})

      const planList = await getPlans()
      const subscription = null
      if (user.qvo.subscriptionId) {
        subscription = await getSubscription(user.qvo.subscriptionId)
        planList = planList.filter((plan, index, arr) => plan.id != subscription.plan.id)
      }
      planList = planList.filter((plan, index, arr) => plan.id != 'asiento')
      return planList
    } catch (error) {
      console.log('Error:', error)
      return null
    }
  }
})
