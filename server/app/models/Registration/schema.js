import ConfirmEmail from './ConfirmEmail'
import ConfirmPassword from './ConfirmPassword'
import UserData from './UserData'

export default {
  _id: {
    type: 'ID'
  },
  userInformation: {
    type: UserData
  },
  confirmEmail: {
    type: ConfirmEmail
  },
  confirmPassword: {
    type: ConfirmPassword,
    optional: true
  },
  updateDate: {
    type: Date
  }
}
