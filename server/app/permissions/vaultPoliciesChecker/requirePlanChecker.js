import { PermissionsError } from '@orion-js/app'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'

export default async function({ viewer }) {
  const user = await Users.findOne({ _id: viewer.userId })

  if (isEmpty(user.qvo.subscriptionId)) {
    throw new PermissionsError('unauthorized', { message: 'You need a plan to do this' })
  }
}
