import crypto from 'crypto'
import algorithm from './algorithm'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'

export default ({ encryptedItem, cipherPassword, archiveIv }) => {
  if (isEmpty(encryptedItem)) throw new Error('Missing archive to decrypt')
  if (isEmpty(cipherPassword)) throw new Error('Missing cipher password to decrypt')
  if (isEmpty(archiveIv)) throw new Error('Missing archive identificator vector to decrypt')

  if (cipherPassword.length !== 32) throw new Error('Invalid archive decrypt password')
  if (archiveIv.length !== 16) throw new Error('Invalid archive identificator vector')

  const iv = Buffer.from(archiveIv)

  const decipher = crypto.createDecipheriv(algorithm, cipherPassword, iv)
  const decrypted = decipher.update(encryptedItem)
  const finalBuffer = Buffer.concat([decrypted, decipher.final()])

  if (isEmpty(finalBuffer)) throw new Error('Error decrypting archive')

  return cloneDeep(finalBuffer)
}
