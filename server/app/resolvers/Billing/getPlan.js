import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import { createSubscription } from 'app/helpers/qvo'

export default resolver({
  params: {
    planId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({ planId }, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })

    if (user.qvo.subscriptionId) throw new Error('You have a plan')

    try {
      const subscription = await createSubscription(user.qvo.customerId, planId)
      console.log('suscribe: ', subscription)
      if (subscription.status !== 'active') throw new Error('Error creating subscription')

      await user.update({
        $set: { 'qvo.subscriptionId': subscription.id, 'qvo.plan': subscription.plan.id }
      })
    } catch (error) {
      console.log('Error:', error)
    }

    return true
  }
})
