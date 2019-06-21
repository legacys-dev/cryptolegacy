import {createEtherWallet} from 'app/helpers/ethers'

// DONT TOUCH THIS CODE
export default async function(heirCode) {
  if (!heirCode) throw new Error('Heir code is missing')
  if (heirCode.length !== 16) throw new Error('Invalid heir code')

  const etherWallet = await createEtherWallet(heirCode)
  const claimPassword = etherWallet.privateKey.slice(2, 34)
  const claimIv = etherWallet.publicKey.slice(2, 18)

  return {
    claimPassword,
    claimIv
  }
}
