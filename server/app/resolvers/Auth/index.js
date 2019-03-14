import {getAuthResolvers} from '@orion-js/auth'
import Users from 'app/collections/Users'
import sendForgotPasswordToken from './sendForgotPasswordToken'
// import sendEmailVerificationToken from './sendEmailVerificationToken'

export default getAuthResolvers({
  Users,
  // sendEmailVerificationToken,
  sendForgotPasswordToken,
  twoFactor: {
    issuer: 'Orionjs'
  }
})
