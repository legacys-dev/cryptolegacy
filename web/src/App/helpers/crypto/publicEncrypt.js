import crypto from 'crypto'
import isEmpty from 'lodash/isEmpty'

export default ({ toEncrypt, publicKey }) => {
  if (isEmpty(toEncrypt)) throw new Error('Element to encrypt not found')
  if (isEmpty(publicKey)) throw new Error('Public key not found')

  const buffer = Buffer.from(JSON.stringify(toEncrypt), 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)

  return encrypted.toString('base64')
}
