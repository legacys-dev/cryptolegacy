import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Authentications from './Authentications'
import Files from './Files'
import Registrations from './Registrations'
import Users from './Users'
import Vaults from './Vaults'
import Activities from './Activities'
import EmergencyKits from './EmergencyKits'
import VaultPolicies from './VaultPolicies'

export default {
  ...VaultPolicies,
  ...EmergencyKits,
  ...Activities,
  ...resolversSchemas,
  ...Auth,
  ...Authentications,
  ...Files,
  ...Registrations,
  ...Users,
  ...Vaults
}
