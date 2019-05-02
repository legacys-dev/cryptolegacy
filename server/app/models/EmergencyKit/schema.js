export default {
  _id: {
    type: 'ID'
  },
  userId: {
    type: 'ID',
    private: true
  },
  key: {
    type: String,
    private: true
  },
  encrypted: {
    type: String,
    private: true
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
