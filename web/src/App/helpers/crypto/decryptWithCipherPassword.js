import crypto from 'crypto'
import algorithm from './algorithm'

export default function({encryptedItem, password, iv, type}) {
  if (!encryptedItem || !password || !type) throw new Error('Missing information')
  if (password.length !== 32) throw new Error('Invalid user secret')

  let encryptionIv
  let encrypted

  if (type === 'archive') {
    encrypted = Buffer.from(encryptedItem, 'hex')
    encryptionIv = iv
  }

  if (type === 'meta-data') {
    const hashArray = encryptedItem.split(':')
    if (!hashArray[0] || !hashArray[1]) throw new Error('Hash or iv missing')

    encrypted = Buffer.from(hashArray[1], 'hex')
    encryptionIv = Buffer.from(hashArray[0], 'hex')
  }

  const decipher = crypto.createDecipheriv(algorithm, password, encryptionIv)
  const decrypted = decipher.update(encrypted)
  const finalBuffer = Buffer.concat([decrypted, decipher.final()])

  const result =
    type === 'meta-data' ? finalBuffer.toString() : type === 'archive' ? finalBuffer : null

  return result
}
