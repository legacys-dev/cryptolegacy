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
  returns: Boolean,
  requireLogin: true,
  emergencyKitPermissions: true,
  async resolve({emergencyKitId}, viewer) {
    const limitTime = DateTime.local()
      .minus({minutes: 4})
      .toJSDate()

    const kit = await EmergencyKits.findOne({
      _id: emergencyKitId,
      createdAt: {$gte: limitTime}
    })

    return !isEmpty(kit)
  }
})
