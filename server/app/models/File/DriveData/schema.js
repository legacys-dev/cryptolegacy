export default {
  fileId: {
    type: 'ID'
  },
  driveId: {
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
