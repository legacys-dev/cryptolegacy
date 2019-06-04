import * as openpgp from 'openpgp'

export default async function({privateKey, passphrase, encryptedMessage}) {
  if (!privateKey) throw new Error('Invalid privateKey')
  if (typeof privateKey !== 'string') throw new Error('Invalid private key type')
  if (privateKey.length < 40) throw new Error('Invalid private key length')

  if (!passphrase) throw new Error('Invalid passphrase')
  if (typeof passphrase !== 'string') throw new Error('Invalid passphrase type')
  if (passphrase.length < 21) throw new Error('Invalid passphrase length')

  if (!encryptedMessage) throw new Error('Invalid encrypted message')

  const messageToDecrypt = await openpgp.message.readArmored(encryptedMessage)
  const privateKeyObject = (await openpgp.key.readArmored(privateKey)).keys[0]

  await privateKeyObject.decrypt(passphrase)

  const decryptOptions = {
    message: messageToDecrypt,
    privateKeys: [privateKeyObject]
  }

  const decryptedMessage = await openpgp.decrypt(decryptOptions).then(plaintext => {
    if (plaintext) {
      return plaintext
    }
  })

  return JSON.parse(decryptedMessage)
}
