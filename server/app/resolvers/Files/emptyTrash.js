import {resolver} from '@orion-js/app'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'
import VaultCredentials from 'app/collections/VaultCredentials'
import {getVaultsIds} from 'app/helpers/vaults'

export default resolver({
  params: {
    userId: {
      type: 'ID'
    }
  },
  returns: Boolean,
  mutation: true,
  requireLogin: true,
  async resolve({userId}, viewer) {
    const userVaultsCredentials = await VaultCredentials.find({
      userId: viewer.userId,
      credentialType: 'owner'
    }).toArray()

    const vaultsId = getVaultsIds(userVaultsCredentials)

    const files = await Files.find({vaultId: {$in: vaultsId}, status: 'inTrash'}).toArray()

    if (isEmpty(files)) return

    for (const file of files) {
      await file.update({$set: {status: 'authorizedToRemove'}})
    }

    return true
  }
})
