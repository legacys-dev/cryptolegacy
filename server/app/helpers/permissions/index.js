import {addPermissionChecker} from '@orion-js/app'
import registrationChecker from './registrationChecker'
import sessionChecker from './sessionChecker'
import filesChecker from './filesChecker'
import glacierVaultsChecker from './glacierVaultsChecker'
import vaultsChecker from './vaultsChecker'
import emergencyKitChecker from './emergencyKitChecker'
import vaultPoliciesChecker from './vaultPoliciesChecker'

const checkers = [
  registrationChecker,
  sessionChecker,
  filesChecker,
  glacierVaultsChecker,
  vaultsChecker,
  emergencyKitChecker,
  vaultPoliciesChecker
]

for (const checker of checkers) {
  addPermissionChecker(checker)
}
