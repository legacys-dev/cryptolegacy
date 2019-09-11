import crypto from 'crypto'
import algorithm from './algorithm'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

export default ({ encryptedItem, cipherPassword, userDataIv }) => {
  if (isEmpty(encryptedItem)) throw new Error('Missing user data to decrypt')
  if (isEmpty(cipherPassword)) throw new Error('Missing user data decrypt password')
  if (isEmpty(userDataIv)) throw new Error('Missing user data identificator vector')

  if (cipherPassword.length !== 32) throw new Error('Invalid user data decrypt password')
  if (userDataIv.length !== 16) throw new Error('Invalid user data identificator vector')

  const toDecrypt = cloneDeep(Buffer.from(encryptedItem, 'hex'))
  const iv = cloneDeep(Buffer.from(userDataIv))

  const decipher = crypto.createDecipheriv(algorithm, cipherPassword, iv)
  const decrypted = decipher.update(toDecrypt)
  const finalBuffer = Buffer.concat([decrypted, decipher.final()])

  if (isEmpty(finalBuffer)) throw new Error('Error decrypting user data, try again')

  return cloneDeep(finalBuffer.toString())
}
