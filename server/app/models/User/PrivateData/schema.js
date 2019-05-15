export default {
  masterBcrypt: {
    type: String
  },
  data: {
    type: String
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
