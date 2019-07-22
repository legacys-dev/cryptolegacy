import crypto from 'crypto'
import algorithm from './algorithm'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

export default ({itemToEncrypt, cipherPassword, userDataIv}) => {
  if (isEmpty(itemToEncrypt)) throw new Error('Missing user data to encrypt')
  if (isEmpty(cipherPassword)) throw new Error('Missing user data encrypt password')
  if (isEmpty(userDataIv)) throw new Error('Missing user data identificator vector')

  if (cipherPassword.length !== 32) throw new Error('Invalid user data encrypt password')
  if (userDataIv.length !== 16) throw new Error('Invalid user data identificator vector')

  const cipher = crypto.createCipheriv(algorithm, cipherPassword, userDataIv)
  const encrypted = cipher.update(itemToEncrypt)
  const finalBuffer = Buffer.concat([encrypted, cipher.final()])

  if (isEmpty(finalBuffer)) throw new Error('Error encrypting user data, try again')

  return cloneDeep(finalBuffer.toString('hex'))
}
