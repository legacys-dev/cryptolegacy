import {resolver} from '@orion-js/app'
import Heritages from 'app/collections/Heritages'
import Users from 'app/collections/Users'
import {heritageAvailable} from 'app/helpers/emails'

export default resolver({
  params: {
    heritageId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireRole: 'admin',
  requireLogin: true,
  async resolve({heritageId}, viewer) {
    const heritage = await Heritages.findOne({_id: heritageId, status: 'waiting'})
    if (!heritage) throw new Error('Heritage not found')

    const user = await Users.findOne({emails: {$elemMatch: {address: heritage.inheritorEmail}}})
    if (!user) throw new Error('Inheritor not found')

    await heritage.update({$set: {status: 'available'}})

    const userData = {
      email: await user.email(),
      name: await user.name(),
      lastName: await user.lastName()
    }

    const {accessToken, reclaimIdentificator} = heritage
    await heritageAvailable({user: userData, accessToken, reclaimIdentificator})

    return true
  }
})
