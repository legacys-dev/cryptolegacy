import {paginatedResolver} from '@orion-js/app'
import escape from 'escape-string-regexp'
import PersonalVault from 'app/models/PersonalVault'
import PersonalVaults from 'app/collections/PersonalVaults'

export default paginatedResolver({
  returns: PersonalVault,
  params: {
    filter: {
      type: String,
      optional: true
    }
  },
  async getCursor({filter}, viewer) {
    const query = {userId: viewer.userId}

    if (filter) {
      query.name = {$regex: new RegExp(`^${escape(filter)}`)}
    }

    return await PersonalVaults.find(query)
  }
})
