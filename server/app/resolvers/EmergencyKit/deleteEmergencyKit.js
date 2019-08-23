import {resolver} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'

export default resolver({
  params: {
    userId: {
      type: String
    }
  },
  returns: Boolean,
  requireLogin: true,
  async resolve({userId}, viewer) {
    if (userId !== viewer.userId) throw new Error('Unauthorized')

    const keyToDelete = await EmergencyKits.findOne({userId})

    try {
      await keyToDelete.remove()
    } catch (error) {
      console.log('Error:', error)
    }

    return true
  }
})
