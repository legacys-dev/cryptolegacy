import {resolver} from '@orion-js/app'
import Seats from 'app/collections/Seats'

export default resolver({
  params: {
    seatId: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  private: true,
  requireLogin: true,
  async resolve({seatId}, viewer) {
    const seat = await Seats.findOne({_id: seatId})

    if (!seat) throw new Error('Error deleting seat')

    await seat.remove()

    return true
  }
})
