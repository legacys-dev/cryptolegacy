import {privateDecrypt as decryptMessage, userDataEncryptWithPassword} from 'app/helpers/crypto'
import {createEtherWallet} from 'app/helpers/ethers'

// DONT TOUCH THIS CODE
export default async function({credentials, privateKey, vaultId, userId}) {
  const {mainCipherPassword, mainUserV, mainIv} = decryptMessage({
    toDecrypt: credentials,
    privateKey
  })

  const vaultPassphrase = vaultId + mainUserV

  const etherWallet = await createEtherWallet(vaultPassphrase)
  const vaultPassword = etherWallet.privateKey.slice(2, 17) + etherWallet.publicKey.slice(17, 34)

  const params = {
    itemToEncrypt: vaultPassword,
    cipherPassword: mainCipherPassword,
    userDataIv: mainIv
  }

  return userDataEncryptWithPassword(params)
}
