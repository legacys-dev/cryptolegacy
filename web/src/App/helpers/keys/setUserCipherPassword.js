import {encryptMessage} from '../openPgp'
import {getMessagePublicKey} from '../user'

export default async function(cipherPassword, userIv, userV) {
  if (!cipherPassword || cipherPassword.length !== 32) return
  if (!userIv || userIv.length !== 16) return
  if (!userV || userV.length !== 15) return

  const cipherObject = {
    mainCipherPassword: cipherPassword,
    mainIv: userIv,
    mainUserV: userV
  }

  window.localStorage.setItem('access', JSON.stringify(cipherObject))

  if (window.localStorage.encryptedPassword) return

  const publicKey = getMessagePublicKey()
  const result = await encryptMessage({publicKey, textToEncrypt: cipherObject})

  window.localStorage.setItem('encryptedPassword', result)
}
