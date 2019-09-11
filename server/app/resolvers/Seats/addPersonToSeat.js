import { resolver } from '@orion-js/app'
import Seats from 'app/collections/Seats'

export default resolver({
  params: {
    seatId: {
      type: String
    },
    userId: {
      type: String
    },
    vaultId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({ seatId, userId, vaultId }, viewer) {
    const seat = await Seats.findOne({ _id: seatId, ownerId: viewer.userId })

    if (!seat) throw new Error('Seat not found')

    await seat.update({ userId, vaultId, available: false, updatedAt: new Date() })

    return true
  }
})
