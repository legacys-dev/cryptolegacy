import crypto from 'crypto'

export default function(toDecrypt, privateKey) {
  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(privateKey, buffer)
  return JSON.parse(decrypted.toString('utf8'))
}
