import {PermissionsError} from '@orion-js/app'

export default function({viewer}) {
  if (!viewer) {
    throw new PermissionsError('unauthorized', {message: 'Not logged in'})
  }
  if (!viewer.userId) {
    throw new PermissionsError('unauthorized', {message: 'User not found'})
  }
}
