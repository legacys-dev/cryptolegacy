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
    const files = {
      $or: [
        {'s3Data.status': 'uploaded'},
        {'b2Data.status': 'uploaded'},
        {'glacierData.status': 'uploaded'}
      ]
    }

    const typeFiles = deletedFiles
      ? personalVaultId
        ? {userVaultId: personalVaultId, status: 'deleted'}
        : {status: 'deleted'}
      : {userVaultId: personalVaultId, status: 'active'}

    const query = {...files, ...typeFiles}

    if (filter) query.searchSlug = {$regex: filter + '.*', $options: 'i'}

    query.userId = viewer.userId

    return Files.find(query).sort({createdAt: -1})
  }
})
