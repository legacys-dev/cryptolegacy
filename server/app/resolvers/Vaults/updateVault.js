import {resolver} from '@orion-js/app'
import Vaults from 'app/collections/Vaults'
import Vault from 'app/models/Vault'

export default resolver({
  params: {
    vaultId: {
      type: 'ID'
    },
    name: {
      type: String,
      label: 'Nombre local',
      description: 'Solo cambiará el nombre local de la bóveda'
    },
    useAsDefault: {
      type: Boolean,
      label: 'Que esta bóveda guarde los archivos de la app',
      optional: true
    }
  },
  returns: Vault,
  mutation: true,
  requireLogin: true,
  requireAdminRole: true,
  checkVaultName: true,
  async resolve({vaultId, name, useAsDefault}, viewer) {
    const vault = await Vaults.findOne(vaultId)

    if (useAsDefault) {
      const defaultVault = await Vaults.findOne({useAsDefault})

      if (defaultVault) {
        defaultVault.update({$set: {defaultVault: false}})
      }
    }

    if (!vault) throw new Error('Error, vault not found')

    await vault.update({$set: {name, useAsDefault}})

    return vault
  }
})
