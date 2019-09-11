import crypto from 'crypto'
import algorithm from './algorithm'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

export default function({ itemToEncrypt, cipherPassword, archiveIv }) {
  if (isEmpty(itemToEncrypt)) throw new Error('Missing archive to encrypt')
  if (isEmpty(cipherPassword)) throw new Error('Missing archive encrypt password')
  if (isEmpty(archiveIv)) throw new Error('Missing archive identificator vector')

  if (cipherPassword.length !== 32) throw new Error('Invalid archive encrypt password')
  if (archiveIv.length !== 16) throw new Error('Invalid archive identificator vector')

  const cipher = crypto.createCipheriv(algorithm, cipherPassword, archiveIv)
  const encrypted = cipher.update(itemToEncrypt)
  const finalBuffer = Buffer.concat([encrypted, cipher.final()])

  if (isEmpty(finalBuffer)) throw new Error('Error encrypting archive, try again')

  return cloneDeep(finalBuffer)
}
