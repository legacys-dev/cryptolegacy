export default {
  _id: {
    type: 'ID'
  },
  archiveId: {
    type: 'ID',
    private: true
  },
  date: {
    type: Date,
    defaultValue: () => new Date()
  }
}
