export default {
  fileId: {
    type: 'ID'
  },
  bucketId: {
    type: String,
    private: true
  },
  contentSha1: {
    type: String,
    private: true
  },
  status: {
    type: String,
    private: true,
    allowedValues: ['pending', 'uploading', 'uploaded'],
    defaultValue: 'pending'
  }
}
