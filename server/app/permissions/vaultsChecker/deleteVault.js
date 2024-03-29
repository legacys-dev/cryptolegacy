import { PermissionsError } from '@orion-js/app'
import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'

export default async function({ viewer, vaultId }) {
  const fileInVault = await Files.findOne({ vaultId })

  if (!isEmpty(fileInVault)) {
    throw new PermissionsError('You cant delete a vault while you have files inside it')
  }
}
