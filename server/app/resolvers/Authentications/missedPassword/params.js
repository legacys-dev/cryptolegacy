import Users from 'app/collections/Users'

export default {
  email: {
    type: 'email',
    async custom(email) {
      const user = await Users.findOne({'emails.address': email})
      if (!user) return 'userNotFound'
    }
  }
}
