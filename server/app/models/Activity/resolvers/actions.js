import {resolver} from '@orion-js/app'
import Users from 'app/collections/Users'
import publicEncrypt from 'app/helpers/crypto/publicEncrypt'

export default resolver({
  params: {},
  returns: String,
  async resolve(activity, params, viewer) {
    const actions = {
      actions: activity.data
    }
    const user = await Users.findOne({_id: viewer.userId})
    const {publicKey} = user.messageKeys
    const encryptData = publicEncrypt({toEncrypt: actions, publicKey})

    return encryptData
  }
})