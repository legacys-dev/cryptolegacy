import {resolver} from '@orion-js/app'
import {metaDataEncryptWithPassword as encrypt} from 'app/helpers/crypto'
import VaultPolicies from 'app/collections/VaultPolicies'
import Vaults from 'app/collections/Vaults'
import Users from 'app/collections/Users'
import {getVaultsIds} from 'app/helpers/vaults'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    credentialType: {
      type: String
    }
  },
  returns: 'blackbox',
  async resolve({credentialType}, viewer) {
    const userVaultsPolicies = await VaultPolicies.find({
      userId: viewer.userId,
      credentialType
    }).toArray()

    const vaultsId = getVaultsIds(userVaultsPolicies)

    const vaults = await Vaults.find({_id: {$in: vaultsId}}).toArray()

    if (isEmpty(vaults)) return {items: null}

    const vaultsData = vaults.map(vault => vault.data())

    const itemToEncrypt = await Promise.all(vaultsData)
    const user = await Users.findOne({_id: viewer.userId})
    const cipherPassword = user.communicationPassword

    return {items: encrypt({itemToEncrypt, cipherPassword})}
  }
})
