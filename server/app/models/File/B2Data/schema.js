export default {
  fileId: {
    type: 'ID'
  },
  bucketId: {
    type: String
  },
  bucketName: {
    type: String
  },
  contentSha1: {
    type: String
  },
  errorAtUpload: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    allowedValues: ['pending', 'uploading', 'uploaded'],
    defaultValue: 'pending'
  }
}
