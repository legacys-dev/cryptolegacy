export default {
  publicKey: {
    type: String
  },
  privateKey: {
    type: String
  },
  passphrase: {
    type: String
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
