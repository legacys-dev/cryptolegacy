import crypto from 'crypto'
import algorithm from './algorithm'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

export default ({encryptedItem, cipherPassword}) => {
  if (isEmpty(encryptedItem)) throw new Error('Missing meta data to decrypt')
  if (isEmpty(cipherPassword)) throw new Error('Missing meta data decrypt password')

  if (cipherPassword.length !== 32) throw new Error('Invalid meta data decrypt password')

  const hashArray = encryptedItem.split(':')
  if (!hashArray[0] || !hashArray[1]) throw new Error('Hash or iv missing')

  const encrypted = Buffer.from(hashArray[1], 'hex')
  const iv = Buffer.from(hashArray[0], 'hex')

  const decipher = crypto.createDecipheriv(algorithm, cipherPassword, iv)
  const decrypted = decipher.update(encrypted)
  const finalBuffer = Buffer.concat([decrypted, decipher.final()])

  if (!finalBuffer) throw new Error('Error decrypting meta data')

  return cloneDeep(finalBuffer.toString())
}
