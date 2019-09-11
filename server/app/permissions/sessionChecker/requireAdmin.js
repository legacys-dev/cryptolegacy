import { PermissionsError } from '@orion-js/app'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'

export default async function({ viewer }) {
  const user = await Users.findOne({ _id: viewer.userId })

  if (isEmpty(user)) throw new PermissionsError('unauthorized', { message: 'User not found' })

  if (isEmpty(user.roles)) {
    throw new PermissionsError('unauthorized', {
      message: 'User doesnt have the required permissions'
    })
  }

  if (!user.roles.includes('admin')) {
    throw new PermissionsError('unauthorized', {
      message: 'User doesnt have the required permissions'
    })
  }
}
