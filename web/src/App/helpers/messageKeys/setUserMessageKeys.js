import regenerateKey from './regenerateKey'
import {getKeys} from 'App/helpers/ethers'
import {decryptWithCipherPassword} from 'App/helpers/crypto'

export default async function(k, encryptedKeysForMessages) {
  const isObject = typeof k === 'object'
  const isString = typeof k === 'string'

  const userMasterKey = isObject ? regenerateKey(k) : isString && k
  const {secret} = await getKeys(userMasterKey)

  const decipherParams = {
    encryptedItem: encryptedKeysForMessages,
    password: secret,
    iv: null,
    type: 'meta-data'
  }

  const {publicKey, privateKey, passphrase} = JSON.parse(decryptWithCipherPassword(decipherParams))

  const messages = {
    publicKey,
    privateKey,
    passphrase
  }

  window.localStorage.setItem('messages', JSON.stringify(messages))
}
