import {createEtherWallet} from 'App/helpers/ethers'
import isEmpty from 'lodash/isEmpty'

export default async archiveId => {
  if (isEmpty(archiveId)) {
    throw new Error('Passphrase to create archive identificator vector is missing')
  }

  if (archiveId.length !== 16) throw new Error('Invalid passphras for archive identificator vector')

  const walletCredentials = await createEtherWallet(archiveId)
  const {privateKey, publicKey} = walletCredentials

  const startIv = publicKey.slice(0, 8)
  const endIv = privateKey.slice(9, 17)

  return (startIv + endIv).toString()
}
