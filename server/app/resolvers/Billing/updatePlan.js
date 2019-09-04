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
      console.log('plan id: ', planId)
      const subscription = await updateSubscription(user.qvo.subscriptionId, planId)
      console.log('suscription: ', subscription)
      console.log('User: ', user)
      if (subscription.status !== 'active') throw new Error('Error updating subscription')

      const newUser = await user.update({
        $set: { 'qvo.subscriptionId': subscription.id, 'qvo.plan': subscription.plan.id }
      })
      console.log("Nuevo usuario: ",newUser)
    } catch (error) {
      console.log('Error:', error)
    }
    return true
  }
})
