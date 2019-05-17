import regenerateKey from './regenerateKey'
import {getKeys} from 'App/helpers/ethers'
import {decryptWithCipherPassword} from 'App/helpers/crypto'

export default async function(k, encryptedKeysForMessages) {
  const userMasterKey = regenerateKey(k)
  const {secret} = await getKeys(userMasterKey)

  const decipherParams = {
    encryptedItem: encryptedKeysForMessages,
    password: secret,
    iv: null,
    type: 'meta-data'
  }

  const {publicKey, privateKey, passphrase} = JSON.parse(decryptWithCipherPassword(decipherParams))

  window.localStorage.setItem('messagePublicKey', publicKey)
  window.localStorage.setItem('messagePrivateKey', privateKey)
  window.localStorage.setItem('messagePassphrase', passphrase)
}
