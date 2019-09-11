import { resolver } from '@orion-js/app'
import Seats from 'app/collections/Seats'

export default resolver({
  params: {
    ownerId: {
      type: String
    },
    subscriptionId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  private: true,
  requireLogin: true,
  async resolve({ ownerId, subscriptionId }, viewer) {
    await Seats.insert({ ownerId, subscriptionId })
    return true
  }
})
