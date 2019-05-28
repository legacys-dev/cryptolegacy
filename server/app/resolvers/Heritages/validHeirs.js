import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import Heritages from 'app/collections/Heritages'

export default resolver({
  params: {
    accessToken: {
      type: String
    }
  },
  returns: String,
  requireLogin: true,
  async resolve({accessToken}, viewer) {
    const heritage = await Heritages.findOne({accessToken, status: 'available'})
    const user = await Users.findOne({emails: {$elemMatch: {address: heritage.inheritorEmail}}})

    if (!heritage) return
    if (!user) return
    if (user._id !== viewer.userId) return

    return heritage.reclaimIdentificator
  }
})
