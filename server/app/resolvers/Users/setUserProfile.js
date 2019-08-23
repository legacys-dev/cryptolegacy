import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import User from 'app/models/User'
import UserProfile from 'app/models/User/UserProfile'

export default resolver({
  params: {
    userId: {
      type: 'ID'
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  returns: User,
  requireUserId: true,
  mutation: true,
  checkPermission({userId}, viewer) {
    if (userId !== viewer.userId) return 'userNotAllowed'
  },
  async resolve({userId, firstName, lastName}, viewer) {
    const profile = {firstName, lastName}
    await Users.update(userId, {$set: {profile}})
    return await Users.findOne(userId)
  }
})
