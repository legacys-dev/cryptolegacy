import {createKeyPairs, publicEncrypt, privateDecrypt} from 'app/helpers/crypto'
import {generateId} from '@orion-js/app'

it('Should encrypt an item and decrypt it, it should be the same', () => {
  const {publicKey, privateKey} = createKeyPairs()
  const message = 'This text is an example for encryption' + generateId(10)
  const encryptedContent = publicEncrypt(message, publicKey)
  const decryptedContent = privateDecrypt(encryptedContent, privateKey)

  expect(typeof encryptedContent).toBe('string')
  expect(typeof decryptedContent).toBe('string')
  expect(decryptedContent.localeCompare(message)).toBe(0)
})
