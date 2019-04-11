import crypto from 'crypto'
import cloneDeep from 'lodash/cloneDeep'

export default function(encryptedItem, userSecret, userIv, type) {
  if (!encryptedItem || !userSecret || !type) throw new Error('Missing information')
  if (userSecret.length !== 32) throw new Error('Invalid user secret')

  let encryptionIv
  let encrypted

  if (type === 'archive') {
    encrypted = cloneDeep(Buffer.from(encryptedItem, 'hex'))
    encryptionIv = cloneDeep(userIv)
  }

  if (type === 'meta-data') {
    const hashArray = encryptedItem.split(':')
    if (!hashArray[0] || !hashArray[1]) throw new Error('Hash or iv missing')

    encrypted = cloneDeep(Buffer.from(hashArray[1], 'hex'))
    encryptionIv = cloneDeep(Buffer.from(hashArray[0], 'hex'))
  }

  const algorithm = 'aes-256-ctr'

  const decipher = crypto.createDecipheriv(algorithm, userSecret, encryptionIv)
  const decrypted = decipher.update(encrypted)
  const finalBuffer = Buffer.concat([decrypted, decipher.final()])

  const result =
    type === 'meta-data'
      ? cloneDeep(Buffer.concat([decrypted, decipher.final()]).toString())
      : type === 'archive'
      ? cloneDeep(finalBuffer)
      : null

  return result
}
