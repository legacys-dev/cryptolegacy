import crypto from 'crypto'
import isEmpty from 'lodash/isEmpty'

export default ({toDecrypt, privateKey}) => {
  if (isEmpty(toDecrypt)) throw new Error('Element to decrypt not found')
  if (isEmpty(privateKey)) throw new Error('Private key not found')

  const buffer = Buffer.from(toDecrypt, 'base64')
  const decrypted = crypto.privateDecrypt(privateKey, buffer)
  return JSON.parse(decrypted.toString('utf8'))
}
