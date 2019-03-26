import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Users from './Users'
import Registrations from './Registrations'
import Files from './Files'

export default {
  ...resolversSchemas,
  ...Files,
  ...Registrations,
  ...Auth,
  ...Users
}
