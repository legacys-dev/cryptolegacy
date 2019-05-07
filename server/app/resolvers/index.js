import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Authentications from './Authentications'
import Files from './Files'
import Registrations from './Registrations'
import Users from './Users'
import Vaults from './Vaults'
import PersonalVaults from './PersonalVaults'
import Activities from './Activities'
import EmergencyKits from './EmergencyKits'

export default {
  ...EmergencyKits,
  ...Activities,
  ...PersonalVaults,
  ...resolversSchemas,
  ...Auth,
  ...Authentications,
  ...Files,
  ...Registrations,
  ...Users,
  ...Vaults
}
