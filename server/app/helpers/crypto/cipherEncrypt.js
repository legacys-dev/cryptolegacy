import crypto from 'crypto'
import cloneDeep from 'lodash/cloneDeep'

export default function(item, userSecret, userIv, type) {
  if (!item || !userSecret || !type) throw new Error('Missing information')
  if (userSecret.length !== 32) throw new Error('Invalid user secret')

  let encryptionIv

  if (type === 'archive') encryptionIv = cloneDeep(userIv)
  if (type === 'meta-data') encryptionIv = cloneDeep(crypto.randomBytes(16))

  if (!encryptionIv || encryptionIv.length !== 16) throw new Error('Invalid IV key')

  // other option aes-192-cbc
  const algorithm = 'aes-256-cbc'

  const cipher = crypto.createCipheriv(algorithm, userSecret, encryptionIv)
  const encrypted = cipher.update(item)
  const finalBuffer = Buffer.concat([encrypted, cipher.final()])

  const result =
    type === 'meta-data'
      ? cloneDeep(`${encryptionIv.toString('hex')}:${finalBuffer.toString('hex')}`)
      : type === 'archive'
      ? cloneDeep(finalBuffer)
      : null

  if (!result) throw new Error('Error encrypting object')

  return result
}
