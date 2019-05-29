import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'

export default resolver({
  params: {},
  returns: String,
  async resolve(heritage, params, viewer) {
    const user = await Users.findOne({_id: heritage.userId})
    return await user.email()
  }
})
