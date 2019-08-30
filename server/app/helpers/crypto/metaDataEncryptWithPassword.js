import crypto from 'crypto'
import algorithm from './algorithm'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

export default function({ itemToEncrypt, cipherPassword }) {
  if (isEmpty(itemToEncrypt)) throw new Error('Missing meta data to encrypt')
  if (isEmpty(cipherPassword)) throw new Error('Missing meta data encrypt password')

  if (cipherPassword.length !== 32) throw new Error('Invalid meta data encrypt password')

  const iv = crypto.randomBytes(16)

  if (iv.length !== 16) throw new Error('Invalid meta data identificator vector')

  const cipher = crypto.createCipheriv(algorithm, cipherPassword, iv)
  const encrypted = cipher.update(JSON.stringify(itemToEncrypt))
  const finalBuffer = Buffer.concat([encrypted, cipher.final()])

  if (isEmpty(finalBuffer)) throw new Error('Error encrypting meta data, try again')

  return cloneDeep(`${iv.toString('hex')}:${finalBuffer.toString('hex')}`)
}
