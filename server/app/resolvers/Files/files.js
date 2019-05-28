import {paginatedResolver} from '@orion-js/app'
import VaultCredentials from 'app/collections/VaultCredentials'
import Files from 'app/collections/Files'
import File from 'app/models/File'
import {getVaultsIds} from 'app/helpers/vaults'

export default paginatedResolver({
  returns: File,
  params: {
    filter: {
      type: String,
      optional: true
    },
    vaultId: {
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
  async getCursor({filter, vaultId, deletedFiles}, viewer) {
    const files = {
      $or: [
        {'s3Data.status': 'uploaded'},
        {'b2Data.status': 'uploaded'},
        {'glacierData.status': 'uploaded'}
      ]
    }

    let typeQuery
    if (deletedFiles) {
      const userVaultsCredentials = await VaultCredentials.find({
        userId: viewer.userId,
        credentialType: 'owner'
      }).toArray()

      const vaultsId = getVaultsIds(userVaultsCredentials)

      typeQuery = {vaultId: {$in: vaultsId}, status: 'inTrash'}
    } else {
      typeQuery = {vaultId, status: 'active'}
    }

    const query = {...files, ...typeQuery}

    if (filter) query.searchSlug = {$regex: filter + '.*', $options: 'i'}

    return Files.find(query).sort({createdAt: -1})
  }
})
