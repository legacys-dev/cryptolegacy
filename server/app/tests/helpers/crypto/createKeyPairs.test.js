import {createKeyPairs} from 'app/helpers/crypto'

it('Should return crypto key pairs', () => {
  const keys = createKeyPairs()
  const {publicKey, privateKey} = keys

  expect(typeof keys).toBe('object')
  expect(typeof publicKey).toBe('string')
  expect(typeof privateKey).toBe('string')
})
