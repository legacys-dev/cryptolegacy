import {paginatedResolver} from '@orion-js/app'
import VaultPolicies from 'app/collections/VaultPolicies'
import VaultPolicy from 'app/models/VaultPolicy'
import escape from 'escape-string-regexp'

export default paginatedResolver({
  returns: VaultPolicy,
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
  vaultPoliciesPaginatedPermissions: true,
  async getCursor({vaultId, filter, adminPanel, status}, viewer) {
    const filterSearch = filter ? {userEmail: {$regex: new RegExp(`^${escape(filter)}`)}} : {}
    const query = {...filterSearch}

    if (adminPanel) {
      query.status = status || 'waiting'
    } else {
      query.vaultId = vaultId
      query.status = 'waiting'
    }

    return VaultPolicies.find(query).sort({createdAt: -1}) // await not necessary
  }
})
