import {ethers} from './function'

export default async function(hash) {
  if (!hash) return
  if (hash.length !== 32) return

  const dataInHex = Buffer.from(hash).toString('hex')

  const mnemonic = await ethers.utils.HDNode.entropyToMnemonic('0x' + dataInHex)
  const copyMNemonic = await ethers.utils.HDNode.entropyToMnemonic('0x' + dataInHex)

  const wallet = ethers.Wallet.fromMnemonic(mnemonic)
  const copyWallet = ethers.Wallet.fromMnemonic(copyMNemonic)

  const privateKey = wallet.signingKey.keyPair.privateKey
  const publicKey = wallet.signingKey.keyPair.publicKey
  const compressedPublicKey = wallet.signingKey.keyPair.compressedPublicKey
  const address = wallet.signingKey.address

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

  return {
    privateKey,
    publicKey
  }
}
