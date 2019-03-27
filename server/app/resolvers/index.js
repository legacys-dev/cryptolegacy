import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Users from './Users'
import Registrations from './Registrations'
import Files from './Files'
import Vaults from './Vaults'

export default {
  ...Vaults,
  ...resolversSchemas,
  ...Files,
  ...Registrations,
  ...Auth,
  ...Users
}
