export default {
  _id: {
    type: 'ID'
  },
  ownerId: {
    type: String
  },
  subscriptionId: {
    type: String
  },
  userId: {
    type: String,
    optional: true
  },
  vaultId: {
    type: String,
    optional: true
  },
  available: {
    type: Boolean,
    defaultValue: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date,
    defaultValue: () => new Date()
  }
}
