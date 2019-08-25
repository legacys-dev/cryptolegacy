import {resolver} from '@orion-js/app'
import userCreditCardUpdated from 'app/subscriptions/Users/userCreditCardUpdated'

export default resolver({
  params: {},
  returns: Boolean,
  async resolve(user, params, viewer) {
    await userCreditCardUpdated({userId: user._id})
    return true
  }
})
