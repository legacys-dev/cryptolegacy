export default {
  _id: {
    type: 'ID'
  },
  name: {
    type: String
  },
  vaultName: {
    type: String,
    provate: true
  },
  useAsDefault: {
    type: Boolean,
    defaultValue: false
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
