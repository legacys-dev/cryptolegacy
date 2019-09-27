import { resolver } from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
import { publicEncrypt } from 'app/helpers/crypto'
import Users from 'app/collections/Users'
import moment from 'moment'

export default resolver({
  params: {},
  returns: 'blackbox',
  async resolve(params, viewer) {
    const emergencyKit = await EmergencyKits.findOne({ userId: viewer.userId })
    const user = await Users.findOne({ _id: viewer.userId })

    const userData = {
      userName: user.profile.firstName,
      userLastName: user.profile.lastName,
      createdAt: moment()
    }

    const { publicKey } = user.messageKeys
    const encryptedUserData = publicEncrypt({ toEncrypt: userData, publicKey })
    return { encryptedUserData, userMasterKey: emergencyKit.encrypted }
  }
})
