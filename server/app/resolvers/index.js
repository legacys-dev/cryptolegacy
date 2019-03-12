import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Users from './Users'
import Registrations from './Registrations'

export default {
  ...Registrations,
  ...resolversSchemas,
  ...Auth,
  ...Users
}
