import {resolver} from '@orion-js/app'
import resolve from './resolve'
import params from './params'

export default resolver({
  params,
  resolve,
  returns: String,
  requireLogin: true
})
