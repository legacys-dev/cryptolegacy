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
  vaultName: {
    type: String,
    private: true
  },
  downloadType: {
    type: String,
    private: true,
    allowedValues: ['Standard', 'Expedited'],
    optional: true
  },
  status: {
    type: String,
    private: true,
    allowedValues: ['pending', 'completed', 'jobDeleted'],
    defaultValue: 'pending'
  },
  completionDate: {
    type: Date,
    private: true,
    optional: true
  },
  createdAt: {
    type: Date
  }
}
