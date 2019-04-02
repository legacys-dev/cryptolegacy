export default {
  archiveId: {
    type: 'ID',
    private: true
  },
  location: {
    type: String
  },
  checksum: {
    type: String,
    optional: true
  },
  vaultName: {
    type: String,
    private: true
  },
  errorAtUpload: {
    type: 'blackbox',
    optional: true
  },
  status: {
    type: String,
    private: true,
    allowedValues: ['pending', 'uploading', 'uploaded'],
    defaultValue: 'pending'
  }
}
