import UserProfile from './UserProfile'
import UserEmail from './UserEmail'
import PrivateData from './PrivateData'

export default {
  _id: {
    type: 'ID'
  },
  emails: {
    type: [UserEmail]
  },
  createdAt: {
    type: Date
  },
  services: {
    type: 'blackbox',
    private: true
  },
  accountSecret: {
    type: PrivateData,
    private: true,
    optional: true
  },
  profile: {
    type: UserProfile,
    label: 'Profile'
  },
  roles: {
    type: ['ID'],
    optional: true
  },
  stripeCustomerId: {
    type: String,
    private: true,
    optional: true
  }
}
