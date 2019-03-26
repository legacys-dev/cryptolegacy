import cloneDeep from 'lodash/cloneDeep'
import isLoggedIn from './isLoggedIn'

export default async function(options, viewer, {params}) {
  params = cloneDeep(params)

  const {checkSession} = options

  if (checkSession) {
    isLoggedIn({viewer})
  }
}
