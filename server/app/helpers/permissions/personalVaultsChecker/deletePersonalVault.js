import Files from 'app/collections/Files'
import isEmpty from 'lodash/isEmpty'

export default async function({viewer, personalVaultId}) {
  const fileInVault = await Files.findOne({userVaultId: personalVaultId})

  if (!isEmpty(fileInVault)) {
    throw new Error('You cant delete a vault while you have files inside it')
  }
}
