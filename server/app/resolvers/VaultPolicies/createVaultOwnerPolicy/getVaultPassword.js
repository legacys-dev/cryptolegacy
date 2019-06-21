import {decryptMessage} from 'app/helpers/openPgp'
import {createEtherWallet} from 'app/helpers/ethers'
import {userDataEncryptWithPassword} from 'app/helpers/crypto'

// DONT TOUCH THIS CODE
export default async function({credentials, privateKey, passphrase, vaultId, userId}) {
  const {mainCipherPassword, mainUserV, mainIv} = await decryptMessage({
    encryptedMessage: credentials,
    privateKey,
    passphrase
  })
  const vaultPassphrase = vaultId + mainUserV

  const etherWallet = await createEtherWallet(vaultPassphrase)
  const vaultPassword = etherWallet.privateKey.slice(2, 18) + etherWallet.publicKey.slice(18, 36)

  const params = {
    itemToEncrypt: vaultPassword,
    cipherPassword: mainCipherPassword,
    userDataIv: mainIv
  }

  return userDataEncryptWithPassword(params)
}
