import {addPermissionChecker} from '@orion-js/app'
import registrationChecker from './registrationChecker'
import sessionChecker from './sessionChecker'
import filesChecker from './filesChecker'
import glacierVaultsChecker from './glacierVaultsChecker'
import personalVaultsChecker from './personalVaultsChecker'

const checkers = [
  registrationChecker,
  sessionChecker,
  filesChecker,
  glacierVaultsChecker,
  personalVaultsChecker
]

for (const checker of checkers) {
  addPermissionChecker(checker)
}
