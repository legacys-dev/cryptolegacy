export default {
  archiveId: {
    type: String,
    private: true
  },
  location: {
    type: String
  },
  checksum: {
    type: String,
    optional: true
  },
  errorAtUpload: {
    type: 'blackbox',
    optional: true
  },
  status: {
    type: String,
    private: true,
    defaultValue: 'pending',
    allowedValues: ['pending', 'uploading', 'uploaded']
  }
}
