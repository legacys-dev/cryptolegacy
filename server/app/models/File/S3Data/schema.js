export default {
  key: {
    type: String
  },
  bucket: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  },
  size: {
    type: Number
  },
  status: {
    type: String,
    allowedValues: ['uploading', 'uploaded']
  },
  externalUrl: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date
  },
  deletedFromS3: {
    type: Boolean,
    defaultValue: false
  }
}
