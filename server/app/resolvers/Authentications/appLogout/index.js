import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'

export default resolver({
  params: {},
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve(params, viewer) {
    const user = await Users.findOne({_id: viewer.userId})
    const {session} = viewer

    await user.update({$set: {messageKeys: null}})

    await session.remove()

    return true
  }
})
