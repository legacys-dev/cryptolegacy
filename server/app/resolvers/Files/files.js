import {paginatedResolver} from '@orion-js/app'
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
      query.searchSlug = {$regex: filter + '.*', $options: 'i'}
    }

    return Files.find(query)
  }
})
