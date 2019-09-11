import { resolver } from '@orion-js/app'

export default resolver({
  params: {},
  returns: Number,
  async resolve(activity, params, viewer) {
    const now = new Date()
    const activityDate = activity.createdAt
    return Math.abs(now - activityDate) / 36e5
  }
})
