import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import { deleteCard } from 'app/helpers/qvo'

export default resolver({
  params: {
    userId: {
      type: String
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve(params, viewer) {
    if (params.userId !== viewer.userId) throw new Error("Users doesn't match.")

    const user = await Users.findOne({ _id: viewer.userId })

    try {
      const card = await deleteCard(user.qvo.customerId, user.qvo.cardId)
      if (!card) throw new Error('Error canceling subscription')

      await user.update({ $set: { 'qvo.cardId': null } })
      await user.updateUserData()
    } catch (error) {
      console.log('Error:', error)
    }

    return true
  }
})
