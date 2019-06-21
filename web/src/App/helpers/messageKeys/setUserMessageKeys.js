import regenerateKey from './regenerateKey'
import {generateUserCipherKeys} from 'App/helpers/keys'
import {userDataDecryptWithPassword} from 'App/helpers/crypto'
import {setUserCipherPassword} from '../keys'

export default async function(k, encryptedKeysForMessages) {
  const isObject = typeof k === 'object'
  const isString = typeof k === 'string'

  const userMasterKey = isObject ? regenerateKey(k) : isString && k
  const {secret, iv, userV} = await generateUserCipherKeys(userMasterKey)

  const decipherParams = {
    encryptedItem: encryptedKeysForMessages,
    cipherPassword: secret,
    userDataIv: iv
  }

  const {publicKey, privateKey, passphrase} = JSON.parse(
    userDataDecryptWithPassword(decipherParams)
  )

  const messages = {
    publicKey,
    privateKey,
    passphrase
  }

  window.localStorage.setItem('messages', JSON.stringify(messages))

  if (isString) await setUserCipherPassword(secret, iv, userV)
}
