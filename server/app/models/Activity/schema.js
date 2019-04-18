import ActivityData from './ActivityData'

export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: 'ID'
  },
  activityType: {
    type: String,
    allowedValues: ['file', 'vault']
  },
  data: {
    type: ActivityData
  },
  createdAt: {
    type: Date
  }
}
