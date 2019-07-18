import * as openpgp from 'openpgp'

export default async ({publicKey, textToEncrypt}) => {
  if (!publicKey) throw new Error('Invalid publicKey')
  if (typeof publicKey !== 'string') throw new Error('Invalid public key type')
  if (publicKey.length < 40) throw new Error('Invalid public key length')

  if (!textToEncrypt) throw new Error('Invalid text to encrypt')

  const messageToEncrypt = await openpgp.message.fromText(JSON.stringify(textToEncrypt))
  const publicKeysToEncrypt = (await openpgp.key.readArmored(publicKey)).keys

  const encryptOptions = {
    message: messageToEncrypt,
    publicKeys: publicKeysToEncrypt
  }

  const encryptedMessage = await openpgp.encrypt(encryptOptions).then(cipherText => {
    if (cipherText) return cipherText
  })

  return encryptedMessage.data
}
