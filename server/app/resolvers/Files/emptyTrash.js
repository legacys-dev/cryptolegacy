import { resolver } from '@orion-js/app'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'
import VaultPolicies from 'app/collections/VaultPolicies'
import { getVaultsIds } from 'app/helpers/vaults'

export default resolver({
  params: {
    userId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({ userId }, viewer) {
    const userVaultsPolicies = await VaultPolicies.find({
      userId: viewer.userId,
      credentialType: 'owner'
    }).toArray()

    const vaultsId = getVaultsIds(userVaultsPolicies)

    const files = await Files.find({ vaultId: { $in: vaultsId }, status: 'inTrash' }).toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      file.update({ $set: { status: 'authorizedToRemove' } }) // await not necessary
    }

    return true
  }
})
