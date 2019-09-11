import { resolver } from '@orion-js/app'
import Seats from 'app/collections/Seats'
import { cancelSubscription } from 'app/helpers/qvo'
import deleteSeat from 'app/resolvers/Seats/deleteSeat'

export default resolver({
  params: {
    seatId: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  async resolve({ seatId }, viewer) {
    const seat = await Seats.findOne({ _id: seatId, creatorId: viewer.userId })

    if (!seat) throw new Error('Seat not found')

    const { userId, vaultId, available } = seat
    if (userId || vaultId || !available) throw new Error('Error deleting seat')

    try {
      const seatSubscription = await cancelSubscription(seat.subscriptionId)

      if (!seatSubscription) throw new Error('Error canceling seat')

      await deleteSeat({ seatId }, viewer)
    } catch (error) {
      console.log('Error:', error)
    }
  }
})
