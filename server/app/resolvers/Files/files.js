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
      type: 'ID',
      optional: true
    },
    deletedFiles: {
      type: Boolean,
      optional: true
    }
  },
  requireLogin: true,
  filesVaultOwner: true,
  async getCursor({filter, personalVaultId, deletedFiles}, viewer) {
    const query = deletedFiles
      ? personalVaultId
        ? {userId: viewer.userId, userVaultId: personalVaultId, status: 'deleted'}
        : {userId: viewer.userId, status: 'deleted'}
      : {userId: viewer.userId, userVaultId: personalVaultId, status: 'active'}

    if (filter) {
      query.searchSlug = {$regex: filter + '.*', $options: 'i'}
    }

    return Files.find(query).sort({createdAt: -1})
  }
})
