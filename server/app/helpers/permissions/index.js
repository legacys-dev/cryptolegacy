import {addPermissionChecker} from '@orion-js/app'
import registrationChecker from './registrationChecker'
import sessionChecker from './sessionChecker'
import filesChecker from './filesChecker'
import vaultsChecker from './vaultsChecker'

const checkers = [registrationChecker, sessionChecker, filesChecker, vaultsChecker]

for (const checker of checkers) {
  addPermissionChecker(checker)
}
