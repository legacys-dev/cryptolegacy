export default {
  masterHash: {
    type: String
  },
  secretKey: {
    type: String
  },
  secretIv: {
    type: String
  },
  encryptedContent: {
    type: String,
    private: true,
    optional: true
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
