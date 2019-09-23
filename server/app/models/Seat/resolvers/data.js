import { resolver } from '@orion-js/app'
import Users from 'app/collections/Users'
import Vaults from 'app/collections/Vaults'

export default resolver({
  params: {},
  returns: String,
  async resolve(seat, params, viewer) {
    const userData = {}

    if (!seat.available) {
      const user = await Users.findOne({ _id: seat.userId })
      const vault = await Vaults.findOne({ _id: seat.vaultId })

      userData.userEmail = await user.email()
      userData.vault = vault.name
    }

    return {
      _id: seat._id,
      ownerId: seat.ownerId,
      available: seat.available,
      updatedAt: seat.updatedAt,
      ...userData
    }
  }
})
