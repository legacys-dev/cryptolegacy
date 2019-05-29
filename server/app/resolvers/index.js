import {resolversSchemas} from '@orion-js/graphql'
import Auth from './Auth'
import Authentications from './Authentications'
import Files from './Files'
import Registrations from './Registrations'
import Users from './Users'
import Vaults from './Vaults'
import Activities from './Activities'
import EmergencyKits from './EmergencyKits'
import Heritages from './Heritages'
import VaultCredentials from './VaultCredentials'

export default {
  ...VaultCredentials,
  ...Heritages,
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
