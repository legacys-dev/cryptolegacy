import { resolver } from '@orion-js/app'
import userDataUpdate from 'app/subscriptions/Users/userDataUpdate'
import Users from 'app/collections/Users'

export default resolver({
  params: {},
  returns: Boolean,
  async resolve(user, params, viewer) {
    const newDataUser = await Users.findOne({ _id: user._id })
    await userDataUpdate({ userId: user._id }, newDataUser)

    return true
  }
})
