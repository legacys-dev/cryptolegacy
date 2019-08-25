import {resolver} from '@orion-js/app'
import Seats from 'app/collections/Seats'
import deleteVaultPolicy from 'app/resolvers/VaultPolicies/deleteVaultPolicy'

export default resolver({
  params: {
    seatId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({seatId}, viewer) {
    const seat = await Seats.findOne({_id: seatId})

    if (!seat) throw new Error('Seat not found')

    try {
      await deleteVaultPolicy({userId: seat.userId}, viewer)
      await seat.update({$set: {userId: null, vaultId: null, updatedAt: new Date()}})
    } catch (error) {
      console.log('Error:', error)
    }

    return true
  }
})
