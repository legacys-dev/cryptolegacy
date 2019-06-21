import {resolver} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import createActivity from 'app/resolvers/Activities/createActivity'
import createVaultOwnerPolicy from 'app/resolvers/VaultPolicies/createVaultOwnerPolicy'
import {slugify} from 'app/helpers/parts'

export default resolver({
  params: {
    name: {
      type: String,
      label: 'Nombre de la bóveda'
    },
    credentials: {
      type: String
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  checkVaultName: true,
  async resolve({name, credentials}, viewer) {
    const params = {
      name,
      searchSlug: slugify(name),
      createdAt: new Date()
    }

    const vaultId = await Vaults.insert(params)

    let onError
    try {
      await createVaultOwnerPolicy({vaultId, credentials}, viewer)
    } catch (error) {
      console.log(error)
      onError = !!error
    }

    if (onError) {
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
