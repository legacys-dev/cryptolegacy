import {createEtherWallet} from 'App/helpers/ethers'
import getHashItems from './getHashItems'

export default async function(masterHash) {
  const hash = getHashItems(masterHash)
  const walletCredentials = await createEtherWallet(hash.original)

  const {privateKey, publicKey} = walletCredentials

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