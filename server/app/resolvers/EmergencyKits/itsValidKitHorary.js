import {resolver} from '@orion-js/app'
import EmergencyKits from 'app/collections/EmergencyKits'
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
  returns: Boolean,
  requireLogin: true,
  emergencyKitPermissions: true,
  async resolve({emergencyKitId, emergencyKey}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 2})
      .toJSDate()

    const kit = await EmergencyKits.findOne({
      _id: emergencyKitId,
      key: emergencyKey,
      createdAt: {$gte: limitTime}
    })

    return !isEmpty(kit)
  }
})
