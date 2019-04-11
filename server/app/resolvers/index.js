import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Authentications from './Authentications'
import Files from './Files'
import Registrations from './Registrations'
import Users from './Users'
import Vaults from './Vaults'

export default {
  ...resolversSchemas,
  ...Auth,
  ...Authentications,
  ...Files,
  ...Registrations,
  ...Users,
  ...Vaults
}
