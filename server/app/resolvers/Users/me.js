import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import User from 'app/models/User'

export default resolver({
  params: {},
  returns: User,
  mutation: false,
  async resolve(params, viewer) {
    return await Users.findOne(viewer.userId)
  }
})
