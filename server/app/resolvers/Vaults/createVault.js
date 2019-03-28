import {resolver, generateId} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import createGlacierVault from 'app/helpers/awsGlacier/createVault'

export default resolver({
  params: {
    name: {
      type: String,
      label: 'Nombre de la bóveda en glacier',
      description:
        'El nombre es de uso local, la bóveda en glacier se crea con un nombre encryptado.'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  requireAdminRole: true,
  checkVaultName: true,
  async resolve({name}, viewer) {
    const vaultName = generateId(19)

    let hasError
    try {
      await createGlacierVault({vaultName})
    } catch (error) {
      hasError = !!error
    }

    if (hasError) throw new Error('Error creating glacier vault')

    await Vaults.insert({
      name,
      vaultName
    })

    return true
  }
})
