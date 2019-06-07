import {resolver} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import createActivity from 'app/resolvers/Activities/createActivity'
import createVaultCredentials from 'app/resolvers/VaultCredentials/createVaultCredentials'
import {slugify} from 'app/helpers/parts'

export default resolver({
  params: {
    name: {
      type: String,
      label: 'Nombre de la bóveda'
    }
  },
  returns: String,
  mutation: true,
  requireLogin: true,
  checkVaultName: true,
  async resolve({name}, viewer) {
    const params = {
      name,
      searchSlug: slugify(name),
      createdAt: new Date()
    }

    const vaultId = await Vaults.insert(params)

    let onError
    try {
      await createVaultCredentials({vaultId, credentialType: 'owner'}, viewer)
    } catch (error) {
      console.log(error)
      onError = !!error
    }

    if (onError) {
      const vault = await Vaults.findOne(vaultId)
      await vault.remove()
      throw new Error('Error creating vault credentials. Vault was removed')
    }

    const activityTypeParams = {
      activityType: 'vault',
      actionType: 'createVault',
      vaultName: name,
      status: 'finished'
    }

    await createActivity(activityTypeParams, viewer)

    return vaultId
  }
})
