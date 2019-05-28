import {PermissionsError} from '@orion-js/app'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'
import VaultCredentials from 'app/collections/VaultCredentials'

export default async function({fileId, viewer}) {
  const file = await Files.findOne(fileId)

  const vaultCredential = await VaultCredentials.findOne({
    userId: viewer.userId,
    vaultId: file.vaultId
  })

  if (isEmpty(vaultCredential)) {
    throw new PermissionsError('unauthorized', {message: 'Unauthorized file access'})
  }
}
