import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import { cancelSubscription } from 'app/helpers/qvo'

export default resolver({
  params: {},
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve(params, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })

    try {
      const subscription = await cancelSubscription(user.qvo.subscriptionId)
      if (subscription.status !== 'active') throw new Error('Error canceling subscription')

      await user.update({ $set: { 'qvo.subscriptionId': null } })
    } catch (error) {
      console.log('Error:', error)
    }

    return true
  }
})
