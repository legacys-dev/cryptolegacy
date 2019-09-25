import { resolver } from '@orion-js/app'
import Seats from 'app/collections/Seats'
import { cancelSubscription } from 'app/helpers/qvo'

export default resolver({
  params: {
    seatId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  private: true,
  requireLogin: true,
  async resolve({ seatId }, viewer) {
    const seat = await Seats.findOne({ _id: seatId })

    if (!seat) throw new Error('Error deleting seat')

    if (!seat.available) throw new Error('The seat is in use')

    try {
      await cancelSubscription(seat.subscriptionId)
      await seat.remove()
    } catch (error) {
      console.log('Error:', error)
      return
    }

    return true
  }
})
