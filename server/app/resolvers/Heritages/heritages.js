import {paginatedResolver} from '@orion-js/app'
import escape from 'escape-string-regexp'
import Heritage from 'app/models/Heritage'
import Heritages from 'app/collections/Heritages'

export default paginatedResolver({
  returns: Heritage,
  params: {
    vaultId: {
      type: String,
      optional: true
    },
    filter: {
      type: String,
      optional: true
    },
    adminPanel: {
      type: Boolean,
      optional: true
    },
    status: {
      type: String,
      optional: true
    }
  },
  requireLogin: true,
  heritagePaginatedPermissions: true,
  async getCursor({vaultId, filter, adminPanel, status}, viewer) {
    const filterSearch = filter
      ? {
          $or: [
            {inheritorEmail: {$regex: new RegExp(`^${escape(filter)}`)}},
            {reclaimIdentificator: {$regex: new RegExp(`^${escape(filter)}`)}},
            {code: {$regex: new RegExp(`^${escape(filter)}`)}}
          ]
        }
      : {}

    const query = {...filterSearch}

    if (adminPanel) {
      query.status = status || 'waiting'
    } else {
      query.vaultId = vaultId
      query.status = 'waiting'
    }

    return Heritages.find(query).sort({createdAt: -1})
  }
})
