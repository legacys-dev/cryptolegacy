import { resolver } from '@orion-js/app'
import Seats from 'app/collections/Seats'

export default resolver({
  params: {},
  returns: ['blackbox'],
  requireLogin: true,
  async resolve(params, viewer) {
    const allSeats = await Seats.find({ ownerId: viewer.userId }).toArray()

    const seatsData = allSeats.map(item => item.data())

    const itemToEncrypt = await Promise.all(seatsData)

    return itemToEncrypt
  }
})
