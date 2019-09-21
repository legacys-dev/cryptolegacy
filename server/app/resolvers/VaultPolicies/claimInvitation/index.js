import { resolver } from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'
import getInvitedUserVaultPassword from './getInvitedUserVaultPassword'
import { claimedInvitation } from 'app/helpers/emails'
import Users from 'app/collections/Users'
import Seats from 'app/collections/Seats'
import checkPermissions from './checkPermissions'

export default resolver({
  params: {
    accessToken: {
      type: String
    },
    credentials: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  async resolve({ accessToken, credentials }, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })
    const vaultPolicy = await VaultPolicies.findOne({
      'transferData.accessToken': accessToken,
      status: 'available'
    })
    const seat = await Seats.findOne({ ownerId: vaultPolicy.creatorId, available: true })

    if (!seat) throw new Error('Seats not availables')

    const code = viewer.userId.slice(0, 16)

    await checkPermissions(vaultPolicy, user, code)

    const { privateKey } = user.messageKeys
    const claimParams = {
      userCredentials: credentials,
      code,
      encryptedVaultPassword: vaultPolicy.vaultPassword,
      privateKey
    }

    const encryptedUserVaultPassword = await getInvitedUserVaultPassword(claimParams)

    await vaultPolicy.update({
      $set: { userId: viewer.userId, vaultPassword: encryptedUserVaultPassword, status: 'active' }
    })

    await seat.update({
      $set: {
        userId: viewer.userId,
        vaultId: vaultPolicy.vaultId,
        available: false,
        updatedAt: new Date()
      }
    })

    const userInformation = {
      email: await user.email(),
      name: await user.name(),
      lastName: await user.lastName()
    }

    claimedInvitation({ user: userInformation, vaultName: await vaultPolicy.vaultName() }) // await not necessary

    return vaultPolicy._id
  }
})
