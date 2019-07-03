import {
  userDataDecryptWithPassword,
  userDataEncryptWithPassword,
  privateDecrypt as decryptMessage
} from 'app/helpers/crypto'
import {generateHeritagePassword} from 'app/helpers/keys'

export default async function({userCredentials, code, encryptedVaultPassword, privateKey}) {
  const {mainCipherPassword, mainIv} = decryptMessage({
    toDecrypt: userCredentials,
    privateKey
  })

  const {claimPassword, claimIv} = await generateHeritagePassword(code)

  const dataToDecrypt = {
    encryptedItem: encryptedVaultPassword,
    cipherPassword: claimPassword,
    userDataIv: claimIv
  }

  const decryptedContent = userDataDecryptWithPassword(dataToDecrypt)

  const userDataToEncrypt = {
    itemToEncrypt: decryptedContent,
    cipherPassword: mainCipherPassword,
    userDataIv: mainIv
  }

  return userDataEncryptWithPassword(userDataToEncrypt)
}
