export default {
  encryptedContent: {
    type: String,
    private: true
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
