import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import Seats from 'app/collections/Seats'

export default resolver({
  params: {},
  returns: 'blackbox',
  requireLogin: true,
  async resolve(params, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })

    const allSeats = await Seats.find({ ownerId: user._id }).toArray()

    const availableSeats = allSeats.filter(seat => seat.available)
    const usedSeats = allSeats.filter(seat => !seat.available)

    return {
      allSeats: allSeats.length,
      availableSeats: availableSeats.length,
      usedSeats: usedSeats.length
    }
  }
})
