import {paginatedResolver} from '@orion-js/app'
import escape from 'escape-string-regexp'
import Files from 'app/collections/Files'
import File from 'app/models/File'

export default paginatedResolver({
  returns: File,
  params: {
    filter: {
      type: String,
      optional: true
    },
    personalVaultId: {
      type: 'ID'
    }
  },
  requireLogin: true,
  vaultOwner: true,
  async getCursor({filter, personalVaultId}, viewer) {
    const query = {userId: viewer.userId, userVaultId: personalVaultId, status: 'active'}

    if (filter) {
      query.name = {$regex: new RegExp(`^${escape(filter)}`)}
    }

    return Files.find(query)
  }
})
