import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'

export default resolver({
  params: {},
  returns: String,
  async resolve(vaultPolicy, params, viewer) {
    const creator = await Users.findOne({_id: vaultPolicy.creatorId})
    return creator && creator.emails[0].address
  }
})
