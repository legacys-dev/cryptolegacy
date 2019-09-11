import { getMessagePublicKey } from '../user'
import { publicEncrypt } from '../crypto'

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
  const result = publicEncrypt({ toEncrypt: cipherObject, publicKey })

  window.localStorage.setItem('encryptedPassword', result)
}
