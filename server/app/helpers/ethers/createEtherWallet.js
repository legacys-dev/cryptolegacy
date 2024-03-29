import { ethers } from 'ethers'
import isEmpty from 'lodash/isEmpty'

// DONT TOUCH THIS CODE
export default async function(passphrase) {
  if (isEmpty(passphrase)) throw new Error('Passphrase to create keys is missing')

  const dataInHex = Buffer.from(passphrase).toString('hex')

  const mnemonic = await ethers.utils.HDNode.entropyToMnemonic('0x' + dataInHex)
  const copyMNemonic = await ethers.utils.HDNode.entropyToMnemonic('0x' + dataInHex)

  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  const copyWallet = ethers.Wallet.fromMnemonic(copyMNemonic)

  if (isEmpty(wallet) || isEmpty(copyWallet)) {
    throw new Error('Error creating credentials with ethers')
  }

  const { privateKey, publicKey, compressedPublicKey } = wallet.signingKey.keyPair
  const { address } = wallet.signingKey

  const copyPrivateKey = copyWallet.signingKey.keyPair.privateKey
  const copyPublicKey = copyWallet.signingKey.keyPair.publicKey
  const copyCompressedPK = copyWallet.signingKey.keyPair.compressedPublicKey
  const copyAddress = copyWallet.signingKey.address

  const compare =
    !!privateKey.localeCompare(copyPrivateKey) ||
    !!publicKey.localeCompare(copyPublicKey) ||
    !!compressedPublicKey.localeCompare(copyCompressedPK) ||
    !!address.localeCompare(copyAddress)

  if (compare) throw new Error('Error creating keys')

  return wallet.signingKey.keyPair
}
