import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import { updateSubscription } from 'app/helpers/qvo'

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

    try {
      const subscription = await updateSubscription(user.qvo.subscriptionId, planId)
      if (subscription.status !== 'active') throw new Error('Error updating subscription')

      await user.update({ $set: { 'qvo.subscriptionId': subscription.id } })
    } catch (error) {
      console.log('Error:', error)
    }
    return true
  }
})
