import {resolver, PermissionsError} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
import {cipherDecrypt} from 'app/helpers/crypto'
import isEmpty from 'lodash/isEmpty'
import {DateTime} from 'luxon'

export default resolver({
  params: {
    emergencyKitId: {
      type: String
    },
    emergencyKey: {
      type: String
    }
  },
  requireLogin: true,
  emergencyKitPermissions: true,
  returns: 'blackbox',
  async resolve({emergencyKitId, emergencyKey}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 2})
      .toJSDate()

    const kit = await EmergencyKits.findOne({
      _id: emergencyKitId,
      key: emergencyKey,
      userId: viewer.userId,
      createdAt: {$gte: limitTime}
    })

    if (isEmpty(kit)) return {}

    const {userId, userMasterHash, email} = JSON.parse(
      cipherDecrypt(kit.encrypted, emergencyKey, null, 'meta-data')
    )

    if (userId !== viewer.userId) {
      throw new PermissionsError('unauthorized', {message: 'Unauthorized kit access'})
    }

    return {
      userMasterKey: userMasterHash.masterKey,
      userEmail: email,
      createdAt: kit.createdAt
    }
  }
})
