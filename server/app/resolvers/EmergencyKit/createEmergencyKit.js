import {resolver, generateId} from '@orion-js/app'
import {publicEncrypt as encryptMessage} from 'app/helpers/crypto'
import EmergencyKits from 'app/collections/EmergencyKits'

export default resolver({
  params: {
    userMasterKey: {
      type: 'blackbox'
    },
    userId: {
      type: String
    },
    email: {
      type: String
    },
    userMessageKeys: {
      type: 'blackbox'
    }
  },
  returns: String,
  async resolve({userId, userMasterKey, email, userMessageKeys}, viewer) {
    const _id = generateId(201)
    const toEncrypt = {userId, userMasterKey, email, createdAt: new Date()}
    const {publicKey} = userMessageKeys

    try {
      const encrypted = await encryptMessage({publicKey, toEncrypt})
      await EmergencyKits.insert({_id, userId, encrypted})
    } catch (error) {
      console.log('Error:', error)
    }

    return {emergencyKitId: _id}
  }
})
