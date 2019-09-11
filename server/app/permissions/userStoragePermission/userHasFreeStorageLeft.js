import { PermissionsError } from '@orion-js/app'
import totalStorageUsed from 'app/resolvers/vaults/totalStorageUsed'
import { getUserStorageAvailable } from 'app/helpers/users'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'

export default async function({ size, viewer }) {
  const user = await Users.findOne({ _id: viewer.userId })

  if (!user) throw new PermissionsError('unauthorized', { message: 'User not found' })

  const params = {}
  const userStorageUsed = await totalStorageUsed(params, viewer)
  const userStorageAvailable =
    !user || !user.customerId ? 104857600 : await getUserStorageAvailable(user.customerId)

  if (isEmpty(size)) throw new PermissionsError('unauthorized', { message: 'File unauthorized' })

  if (size + userStorageUsed > userStorageAvailable) {
    throw new PermissionsError('unauthorized', { message: 'You dont have storage left' })
  }
}
