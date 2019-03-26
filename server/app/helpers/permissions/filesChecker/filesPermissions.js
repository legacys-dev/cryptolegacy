import {PermissionsError} from '@orion-js/app'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'

export default async function({fileId, viewer}) {
  if (!viewer) {
    throw new PermissionsError('unauthorized', {message: 'Not logged in'})
  }

  if (!viewer.userId) {
    throw new PermissionsError('unauthorized', {message: 'User not found'})
  }

  const file = await Files.findOne(fileId)

  if (isEmpty(file)) throw new Error('File not found')

  if (!file.userId) {
    throw new Error('File problem')
  }

  if (file.userId !== viewer.userId) {
    throw new PermissionsError('unauthorized', {message: 'Unauthorized file access'})
  }
}
