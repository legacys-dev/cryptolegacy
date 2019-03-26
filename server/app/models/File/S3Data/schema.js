export default {
  externalUrl: {
    type: String,
    private: true,
    optional: true
  },
  key: {
    type: String,
    private: true
  },
  bucket: {
    type: String,
    private: true
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
  updatedAt: {
    type: Date
  },
  deletedFromS3: {
    type: Boolean,
    defaultValue: false
  }
}
