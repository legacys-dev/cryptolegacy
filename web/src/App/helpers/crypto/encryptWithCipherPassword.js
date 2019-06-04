import crypto from 'crypto'
import algorithm from './algorithm'

export default function({itemToCipher, password, iv, type}) {
  if (!itemToCipher || !password || !type) throw new Error('Missing information')
  if (password.length !== 32) throw new Error('Invalid user secret')

  let encryptionIv

  if (type === 'archive') encryptionIv = iv
  if (type === 'meta-data') encryptionIv = crypto.randomBytes(16)

  if (!encryptionIv || encryptionIv.length !== 16) throw new Error('Invalid IV key')

  const cipher = crypto.createCipheriv(algorithm, password, encryptionIv)
  const encrypted = cipher.update(itemToCipher)
  const finalBuffer = Buffer.concat([encrypted, cipher.final()])

  const result =
    type === 'meta-data'
      ? `${encryptionIv.toString('hex')}:${finalBuffer.toString('hex')}`
      : type === 'archive'
      ? finalBuffer
      : null

  if (!result) throw new Error('Error encrypting')

  return result
}
