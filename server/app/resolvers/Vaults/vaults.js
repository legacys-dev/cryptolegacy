import {paginatedResolver} from '@orion-js/app'
import Vault from 'app/models/Vault'
import Vaults from 'app/collections/Vaults'
import VaultPolicies from 'app/collections/VaultPolicies'
import {getVaultsIds} from 'app/helpers/vaults'

export default paginatedResolver({
  returns: Vault,
  params: {
    filter: {
      type: String,
      optional: true
    },
    credentialType: {
      type: String
    }
  },
  requireLogin: true,
  async getCursor({filter, credentialType}, viewer) {
    const userVaultsPolicies = await VaultPolicies.find({
      userId: viewer.userId,
      credentialType
    }).toArray()

    const vaultsId = getVaultsIds(userVaultsPolicies)

    const query = {_id: {$in: vaultsId}}

    if (filter) query.searchSlug = {$regex: filter + '.*', $options: 'i'}

    return Vaults.find(query).sort({createdAt: -1}) // await not necessary
  }
})
