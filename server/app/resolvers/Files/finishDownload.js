import {resolver} from '@orion-js/app'
import Activities from 'app/collections/Activities'

export default resolver({
  params: {
    activityId: {
      type: String
    },
    status: {
      type: Boolean
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({activityId, status}, viewer) {
    const activity = await Activities.findOne(activityId)
    if (!activity) return

    if (!status) await activity.remove()
    else await activity.update({$set: {status: 'finished'}})

    return true
  }
})
