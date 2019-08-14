import {resolver} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
import isEmpty from 'lodash/isEmpty'
import {DateTime} from 'luxon'

export default resolver({
  params: {
    emergencyKitId: {
      type: String
    }
  },
  requireLogin: true,
  emergencyKitPermissions: true,
  returns: 'blackbox',
  async resolve({emergencyKitId}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 4})
      .toJSDate()
    const kit = await EmergencyKits.findOne({
      _id: emergencyKitId,
      userId: viewer.userId,
      createdAt: {$gte: limitTime}
    })

    if (isEmpty(kit)) return {}

    return {encrypted: kit.encrypted, createdAt: kit.createdAt}
  }
})
