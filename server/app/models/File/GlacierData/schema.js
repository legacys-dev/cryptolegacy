export default {
  archiveId: {
    type: 'ID'
  },
  location: {
    type: String
  },
  checksum: {
    type: String,
    optional: true
  },
  vaultName: {
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
