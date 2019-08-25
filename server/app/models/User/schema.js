import UserProfile from './UserProfile'
import UserEmail from './UserEmail'
import MessageKeys from './MessageKeys'
import Qvo from './Qvo'

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
  messageKeys: {
    type: MessageKeys,
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
  },
  qvo: {
    type: Qvo,
    optional: true
  }
}
