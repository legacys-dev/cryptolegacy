import { createEtherWallet } from 'app/helpers/ethers'
import getHashItems from './getHashItems'

// DONT TOUCH THIS CODE
export default async function(masterKey) {
  const hash = getHashItems(masterKey)
  const walletCredentials = await createEtherWallet(hash.original)

  const { privateKey, publicKey } = walletCredentials

  const { secretKeyInterval, ivKeyInterval } = hash
  const secretEnd = secretKeyInterval + 32
  const ivEnd = ivKeyInterval + 16

  const secret = privateKey.slice(secretKeyInterval, secretEnd)
  const iv = publicKey.slice(ivKeyInterval, ivEnd)
  const userV = privateKey.slice(0, 9) + publicKey.slice(10, 16)

  if (secret.length !== 32 || iv.length !== 16 || userV.length !== 15) {
    throw new Error('Error creating keys')
  }

  return {
    secret,
    iv,
    userV
  }
}
