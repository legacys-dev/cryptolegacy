export default {
  fileId: {
    type: 'ID'
  },
  bucketId: {
    type: String
  },
  contentSha1: {
    type: String
  },
  status: {
    type: String,
    allowedValues: ['pending', 'uploading', 'uploaded'],
    defaultValue: 'pending'
  }
}
