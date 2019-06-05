import {createEtherWallet} from 'app/helpers/ethers'
import isEmpty from 'lodash/isEmpty'

export default async function(archiveId) {
  if (isEmpty(archiveId)) {
    throw new Error('Passphrase to create archive identificator vector is missing')
  }

  if (archiveId.length !== 17) throw new Error('Invalid passphras for archive identificator vector')

  const walletCredentials = await createEtherWallet(archiveId)
  const {privateKey, publicKey} = walletCredentials

  const startIv = publicKey.slice(0, 7)
  const endIv = privateKey.slice(8, 15)

  return (startIv + endIv).toString()
}
