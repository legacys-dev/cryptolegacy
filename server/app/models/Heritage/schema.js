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
  inheritorEmail: {
    type: String,
    private: true
  },
  reclaimIdentificator: {
    type: String,
    private: true
  },
  code: {
    type: 'blackbox',
    private: true
  },
  accessToken: {
    type: String,
    private: true
  },
  status: {
    type: String,
    private: true,
    allowedValues: ['waiting', 'available', 'reclaimed']
  },
  createdAt: {
    type: Date,
    private: true,
    defaultValue: () => new Date()
  }
}
