export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: 'ID',
    private: true
  },
  vaultId: {
    type: 'ID',
    private: true
  },
  credentialType: {
    type: String,
    private: true,
    allowedValues: ['owner', 'heritage']
  },
  encryptedCredentials: {
    type: String
  },
  createdAt: {
    type: Date,
    private: true,
    defaultValue: () => new Date()
  }
}
