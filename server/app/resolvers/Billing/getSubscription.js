import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import { getSubscription } from 'app/helpers/qvo'

export default resolver({
  params: {},
  returns: 'blackbox',
  requireLogin: true,
  async resolve({ subscriptionId }, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })

    try {
      const subscription = await getSubscription(user.qvo.subscriptionId)
      if (!subscription || subscription.status !== 'active') {
        throw new Error('Error getting subscription')
      }

      const { plan } = subscription

      return plan
    } catch (error) {
      console.log('Error:', error)
      return null
    }
  }
})
