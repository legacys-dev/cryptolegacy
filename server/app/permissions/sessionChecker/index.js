import cloneDeep from 'lodash/cloneDeep'
import isLoggedIn from './isLoggedIn'
import requireAdmin from './requireAdmin'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {requireLogin, requireAdminRole} = options

  if (requireLogin) {
    isLoggedIn({viewer})
  }

  if (requireAdminRole) {
    await requireAdmin({viewer})
  }
}
