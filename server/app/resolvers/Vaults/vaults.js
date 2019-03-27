import {paginatedResolver} from '@orion-js/app'
import escape from 'escape-string-regexp'
import Vault from 'app/models/Vault'
import Vaults from 'app/collections/Vaults'

export default paginatedResolver({
  returns: Vault,
  params: {
    filter: {
      type: String,
      optional: true
    }
  },
  async getCursor({filter}, viewer) {
    const query = {}

    if (filter) {
      query.name = {$regex: new RegExp(`^${escape(filter)}`)}
    }

    return Vaults.find(query)
  }
})
