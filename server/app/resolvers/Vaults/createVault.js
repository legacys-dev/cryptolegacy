import { resolver } from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import createActivity from 'app/resolvers/Activities/createActivity'
import createVaultOwnerPolicy from '../VaultPolicies/createVaultOwnerPolicy'
import { slugify } from 'app/helpers/parts'

export default resolver({
  params: {
    name: {
      label: 'vaults.vaultName',
      type: String
    },
    type: {
      label: 'vaults.vaultType',
      type: String
    },
    driveEmail: {
      type: String,
      optional: true,
      async custom(driveEmail, { doc }) {
        if (doc.type !== 'drive') return
        if (!driveEmail) return 'gmailRequired'
        if (!/@gmail\.com$/.test(driveEmail)) return 'gmailStructureRequired'
      }
    },
    credentials: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  checkPlan: true,
  requireLogin: true,
  checkVaultName: true,
  async resolve({ name, type, driveEmail, credentials }, viewer) {
    const params = {
      name,
      type,
      searchSlug: slugify(name),
      createdAt: new Date()
    }

    const vaultId = await Vaults.insert(params)

    try {
      await createVaultOwnerPolicy({ vaultId, driveEmail, credentials }, viewer)
    } catch (error) {
      const vault = await Vaults.findOne(vaultId)
      vault.remove() // await not necessary
      throw new Error('Error creating vault credentials. Vault was removed')
    }

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'createVault',
      vaultName: name,
      status: 'finished'
    }

    createActivity(activityTypeParams, viewer) // await not necessary

    return vaultId
  }
})
