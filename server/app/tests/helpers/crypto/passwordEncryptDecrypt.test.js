import {generateId} from '@orion-js/app'
import {
  archiveEncryptWithPassword,
  archiveDecryptWithPassword,
  metaDataEncryptWithPassword,
  metaDataDecryptWithPassword,
  userDataEncryptWithPassword,
  userDataDecryptWithPassword
} from 'app/helpers/crypto'

it('Should encrypt and decrypt element type buffer', () => {
  const cipherPassword = generateId(32)
  const archiveIv = generateId(16)
  const itemToEncrypt = Buffer.alloc(1024 * 1024)
  const originalItemHex = itemToEncrypt.toString('hex')

  const encryptedItem = archiveEncryptWithPassword({itemToEncrypt, cipherPassword, archiveIv})
  const decryptedItem = archiveDecryptWithPassword({encryptedItem, cipherPassword, archiveIv})
  const decryptedItemHex = decryptedItem.toString('hex')

  expect(originalItemHex.localeCompare(decryptedItemHex)).toBe(0)
})

it('Should encrypt and decrypt element type meta data', () => {
  const cipherPassword = generateId(32)
  const itemToEncrypt = 'This is an example to encrypt' + generateId(11)

  const encryptedItem = metaDataEncryptWithPassword({itemToEncrypt, cipherPassword})
  const decryptedItem = metaDataDecryptWithPassword({encryptedItem, cipherPassword})

  expect(typeof encryptedItem).toBe('string')
  expect(typeof decryptedItem).toBe('string')
  expect(itemToEncrypt.localeCompare(decryptedItem)).toBe(0)
})

it('Should encrypt and decrypt user data', () => {
  const cipherPassword = generateId(32)
  const userDataIv = generateId(16)
  const itemToEncrypt = 'This is an example to encrypt' + generateId(11)

  const encryptedItem = userDataEncryptWithPassword({itemToEncrypt, cipherPassword, userDataIv})
  const decryptedItem = userDataDecryptWithPassword({encryptedItem, cipherPassword, userDataIv})

  expect(typeof encryptedItem).toBe('string')
  expect(typeof decryptedItem).toBe('string')
  expect(itemToEncrypt.localeCompare(decryptedItem)).toBe(0)
})
