export default {
  _id: {
    type: 'ID'
  },
  name: {
    type: String
  },
  type: {
    type: String,
    allowedValues: ['b2', 'glacier', 'drive']
  },
  searchSlug: {
    type: String
  },
  createdAt: {
    type: Date
  }
}
