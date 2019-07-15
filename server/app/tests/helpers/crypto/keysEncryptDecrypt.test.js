import {createKeyPairs, publicEncrypt, privateDecrypt} from 'app/helpers/crypto'
import {generateId} from '@orion-js/app'

it('Should encrypt an item and decrypt it, it must be the same', () => {
  const {publicKey, privateKey} = createKeyPairs()
  const toEncrypt = 'This text is an example for encryption' + generateId(10)

  const toDecrypt = publicEncrypt({toEncrypt, publicKey})
  const decryptedContent = privateDecrypt({toDecrypt, privateKey})

  expect(typeof toDecrypt).toBe('string')
  expect(typeof decryptedContent).toBe('string')
  expect(decryptedContent.localeCompare(toEncrypt)).toBe(0)
})
