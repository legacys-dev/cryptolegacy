import {paginatedResolver} from '@orion-js/app'
import Vault from 'app/models/Vault'
import Vaults from 'app/collections/Vaults'
import VaultCredentials from 'app/collections/VaultCredentials'
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
    const userVaultsCredentials = await VaultCredentials.find({
      userId: viewer.userId,
      credentialType
    }).toArray()

    const vaultsId = getVaultsIds(userVaultsCredentials)

    const query = {_id: {$in: vaultsId}}

    if (filter) {
      query.searchSlug = {$regex: filter + '.*', $options: 'i'}
    }

    return Vaults.find(query).sort({createdAt: -1})
  }
})
