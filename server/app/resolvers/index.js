import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Authentications from './Authentications'
import Files from './Files'
import Registrations from './Registrations'
import Users from './Users'
import Vaults from './Vaults'
import Activities from './Activities'
import EmergencyKit from './EmergencyKit'
import VaultPolicies from './VaultPolicies'
import Billing from './Billing'

export default {
  ...VaultPolicies,
  ...EmergencyKit,
  ...Activities,
  ...resolversSchemas,
  ...Auth,
  ...Authentications,
  ...Files,
  ...Registrations,
  ...Users,
  ...Vaults,
  ...Billing
}
