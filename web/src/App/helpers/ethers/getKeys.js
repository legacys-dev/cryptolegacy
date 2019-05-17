import {ethers} from './function'
import verifyHash from './verifyHash'

export default async function(masterHash) {
  const hash = verifyHash(masterHash)
  const dataInHex = Buffer.from(hash.original).toString('hex')

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

  const {secretKeyInterval, ivKeyInterval} = hash
  const secretEnd = parseInt(secretKeyInterval) + 32
  const ivEnd = parseInt(ivKeyInterval) + 16

  const secret = privateKey.slice(secretKeyInterval, secretEnd)
  const iv = publicKey.slice(ivKeyInterval, ivEnd)

  if (secret.length !== 32 || iv.length !== 16) throw new Error('Error creating keys')

  return {
    secret,
    iv
  }
}
