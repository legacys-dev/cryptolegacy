import {resolver} from '@orion-js/app'

export default resolver({
  params: {},
  returns: String,
  async resolve(activity, params, viewer) {
    return {
      _id: activity._id,
      data: activity.data,
      createdAt: activity.createdAt
    }
  }
})
