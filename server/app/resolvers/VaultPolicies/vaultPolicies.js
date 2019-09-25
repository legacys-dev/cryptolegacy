import { paginatedResolver } from '@orion-js/app'
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
    },
    type: {
      type: String,
      optional: true
    },
    credentialType: {
      type: String,
      optional: true
    }
  },
  requireLogin: true,
  vaultPoliciesPaginatedPermissions: true,
  async getCursor({ vaultId, filter, adminPanel, status, type, credentialType }, viewer) {
    const filterSearch = filter ? { userEmail: { $regex: new RegExp(`^${escape(filter)}`) } } : {}
    const query = { ...filterSearch }

    if (adminPanel) {
      query.status = status || 'waiting'
      query.credentialType = credentialType || 'heritage'
    } else {
      query.vaultId = vaultId

      if (type === 'heritage') query.status = 'waiting'

      query.credentialType = type
    }

    return VaultPolicies.find(query).sort({ createdAt: -1 }) // await not necessary
  }
})
