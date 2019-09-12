import { resolver } from '@orion-js/app'
import { createSubscription } from 'app/helpers/qvo'
import Users from 'app/collections/Users'
import createSeat from 'app/resolvers/Seats/createSeat'

export default resolver({
  params: {
    data: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  async resolve(params, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })
    try {
      const seat = await createSubscription(user.qvo.customerId, 'asiento')
      if (!seat || seat.status !== 'active') throw new Error('Error creating subscription')

      await createSeat({ ownerId: viewer.userId, subscriptionId: seat.id }, viewer)
    } catch (error) {
      console.log('Error:', error)
    }

    return true
  }
})
