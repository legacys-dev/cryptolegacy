import TransferData from './TransferData'

export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: 'ID',
    private: true,
    optional: true
  },
  vaultId: {
    type: String,
    private: true
  },
  vaultPassword: {
    type: String,
    private: true
  },
  credentialType: {
    type: String,
    private: true,
    allowedValues: ['owner', 'heritage']
  },
  creatorId: {
    type: String,
    private: true,
    optional: true
  },
  userEmail: {
    type: String,
    private: true
  },
  status: {
    type: String,
    private: true,
    allowedValues: ['waiting', 'available', 'active'],
    defaultValue: 'waiting'
  },
  transferData: {
    type: TransferData,
    optional: true
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
