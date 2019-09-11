import { getAuthResolvers } from '@orion-js/auth'
import sendForgotPasswordToken from './sendForgotPasswordToken'
import Users from 'app/collections/Users'
// import sendEmailVerificationToken from './sendEmailVerificationToken'

export default getAuthResolvers({
  Users,
  sendForgotPasswordToken,
  // sendEmailVerificationToken,
  twoFactor: {
    issuer: 'Orionjs'
  }
})
