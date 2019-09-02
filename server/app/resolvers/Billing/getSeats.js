import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import Seats from 'app/collections/Seats'

export default resolver({
  params: {},
  returns: Number,
  requireLogin: true,
  async resolve(params, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })
    try {
      const seats = await Seats.find({ ownerId: user['_id'] }).toArray()
      console.log('Numero: ', seats)
      return seats.length
    } catch (error) {
      console.log('Error:', error)
      return 0
    }
  }
})
