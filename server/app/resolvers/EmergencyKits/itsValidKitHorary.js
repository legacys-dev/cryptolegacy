import {resolver} from '@orion-js/app'
import {DateTime} from 'luxon'
import EmergencyKits from 'app/collections/EmergencyKits'
import isEmpty from 'lodash/isEmpty'

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
      .minus({minutes: 30})
      .toJSDate()

    const kit = await EmergencyKits.findOne({
      _id: emergencyKitId,
      key: emergencyKey,
      createdAt: {$gte: limitTime}
    })

    return !isEmpty(kit)
  }
})
