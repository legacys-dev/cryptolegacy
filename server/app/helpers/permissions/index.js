import {addPermissionChecker} from '@orion-js/app'
import registrationChecker from './registrationChecker'
import sessionChecker from './sessionChecker'
import filesChecker from './filesChecker'

const checkers = [registrationChecker, sessionChecker, filesChecker]

for (const checker of checkers) {
  addPermissionChecker(checker)
}
