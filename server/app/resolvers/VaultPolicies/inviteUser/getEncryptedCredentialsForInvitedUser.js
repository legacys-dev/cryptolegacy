import { generateHeritagePassword } from 'app/helpers/keys'
import {
  userDataEncryptWithPassword,
  userDataDecryptWithPassword,
  privateDecrypt as decryptMessage
} from 'app/helpers/crypto'

// DONT TOUCH THIS CODE
export default async function({
  privateKey,
  ownerEncryptedCredentials,
  encryptedVaultCredentials,
  heirCode
}) {
  const { mainCipherPassword, mainIv } = decryptMessage({
    toDecrypt: ownerEncryptedCredentials,
    privateKey
  })

  const toDecryptParams = {
    encryptedItem: encryptedVaultCredentials,
    cipherPassword: mainCipherPassword,
    userDataIv: mainIv
  }

  const decryptedVaultPassword = userDataDecryptWithPassword(toDecryptParams)
  const { claimPassword, claimIv } = await generateHeritagePassword(heirCode)

  const encryptParams = {
    itemToEncrypt: decryptedVaultPassword,
    cipherPassword: claimPassword,
    userDataIv: claimIv
  }

  return userDataEncryptWithPassword(encryptParams)
}
