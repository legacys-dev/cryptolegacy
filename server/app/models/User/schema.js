import UserProfile from './UserProfile'
import UserEmail from './UserEmail'
import Keys from './Keys'

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
  },
  privateKeys: {
    type: Keys,
    private: true,
    optional: true
  }
}
