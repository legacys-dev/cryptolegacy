import { resolver } from '@orion-js/app'
import Files from 'app/collections/Files'
import { planStorage } from 'app/helpers/plan'
import VaultPolicies from 'app/collections/VaultPolicies'
import Users from 'app/collections/Users'
import { getVaultsIds } from 'app/helpers/vaults'

export default resolver({
  params: {},
  returns: 'blackbox',
  requireLogin: true,
  async resolve(params, viewer) {
    const user = await Users.findOne({ _id: viewer.userId })
    const userVaultsPolicies = await VaultPolicies.find({ userId: viewer.userId }).toArray()

    const vaultsId = getVaultsIds(userVaultsPolicies)

    const acceptedStatusForStorage = ['active', 'inTrash']

    const files = await Files.find({
      vaultId: { $in: vaultsId },
      status: { $in: acceptedStatusForStorage }
    }).toArray()

    const userPlan = user.plan || 'free'
    const userPlanStorage = planStorage[userPlan]

    const storageUsed = files.reduce((sum, item) => sum + item.s3Data.size, 0)
    const freeSpace = userPlanStorage - storageUsed
    const percentageUsed = (100 / userPlanStorage) * storageUsed

    return {
      totalStorage: userPlanStorage,
      storageUsed,
      freeSpace,
      percentageUsed
    }
  }
})
