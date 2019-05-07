import {paginatedResolver} from '@orion-js/app'
import PersonalVault from 'app/models/PersonalVault'
import PersonalVaults from 'app/collections/PersonalVaults'

export default paginatedResolver({
  returns: PersonalVault,
  requireLogin: true,
  params: {
    filter: {
      type: String,
      optional: true
    }
  },
  async getCursor({filter}, viewer) {
    const query = {userId: viewer.userId}

    if (filter) {
      query.searchSlug = {$regex: filter + '.*', $options: 'i'}
    }

    return await PersonalVaults.find(query).sort({createdAt: -1})
  }
})
