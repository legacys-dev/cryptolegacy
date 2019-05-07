import crypto from 'crypto'

export default function(toEncrypt, publicKey) {
  const buffer = Buffer.from(JSON.stringify(toEncrypt), 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}
