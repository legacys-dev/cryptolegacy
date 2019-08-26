import regenerateKey from './regenerateKey'
import {generateUserCipherKeys} from 'App/helpers/keys'
import {userDataDecryptWithPassword} from 'App/helpers/crypto'
import {setUserCipherPassword} from '../keys'

export default async function(k, encryptedKeysForMessages) {
  const isString = k && typeof k === 'string'
  const userMasterKey = isString ? k : regenerateKey(k)

  const {secret, iv, userV} = await generateUserCipherKeys(userMasterKey)

  const decipherParams = {
    encryptedItem: encryptedKeysForMessages,
    cipherPassword: secret,
    userDataIv: iv
  }

  const {publicKey, privateKey, communicationPassword} = JSON.parse(
    userDataDecryptWithPassword(decipherParams)
  )

  const messages = {
    publicKey,
    privateKey,
    communicationPassword
  }

  window.localStorage.setItem('messages', JSON.stringify(messages))

  if (isString) await setUserCipherPassword(secret, iv, userV)
}
