import {resolver} from '@orion-js/app'
import {metaDataEncryptWithPassword as encrypt} from 'app/helpers/crypto'
import VaultPolicies from 'app/collections/VaultPolicies'
import {getVaultsIds} from 'app/helpers/vaults'
import Files from 'app/collections/Files'
import Users from 'app/collections/Users'
import isEmpty from 'lodash/isEmpty'

export default resolver({
  params: {
    vaultId: {
      type: 'ID',
      optional: true
    },
    deletedFiles: {
      type: Boolean,
      optional: true
    }
  },
  returns: 'blackbox',
  requireLogin: true,
  async resolve({vaultId, deletedFiles}, viewer) {
    const files = {
      $or: [
        {'s3Data.status': 'uploaded'},
        {'b2Data.status': 'uploaded'},
        {'glacierData.status': 'uploaded'}
      ]
    }

    let typeQuery

    if (deletedFiles) {
      const userVaultsPolicies = await VaultPolicies.find({
        userId: viewer.userId,
        credentialType: 'owner'
      }).toArray()

      const vaultsId = getVaultsIds(userVaultsPolicies)

      typeQuery = {vaultId: {$in: vaultsId}, status: 'inTrash'}
    } else {
      typeQuery = {vaultId, status: 'active'}
    }

    const query = {...files, ...typeQuery}

    const items = await Files.find(query)
      .sort({createdAt: -1})
      .toArray()

    if (isEmpty(items)) return {items: null}

    const filesData = items.map(item => item.data())

    const itemToEncrypt = await Promise.all(filesData)
    const user = await Users.findOne({_id: viewer.userId})
    const cipherPassword = user.communicationPassword

    return {items: encrypt({itemToEncrypt, cipherPassword})}
  }
})
