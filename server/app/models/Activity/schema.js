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
  status: {
    type: String,
    allowedValues: ['pending', 'finished']
  },
  createdAt: {
    type: Date
  }
}
