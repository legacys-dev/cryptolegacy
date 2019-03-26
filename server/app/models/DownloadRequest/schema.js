export default {
  _id: {
    type: 'ID'
  },
  fileId: {
    type: 'ID',
    private: true
  },
  jobId: {
    type: String,
    private: true
  },
  location: {
    type: String,
    private: true
  },
  status: {
    type: String,
    allowedValues: ['active', 'inactive']
  },
  createdAt: {
    type: Date
  }
}
