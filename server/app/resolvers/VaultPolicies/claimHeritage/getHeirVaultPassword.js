import {userDataDecryptWithPassword, userDataEncryptWithPassword} from 'app/helpers/crypto'
import {generateHeritagePassword} from 'app/helpers/keys'
import {decryptMessage} from 'app/helpers/openPgp'

export default async function({
  userCredentials,
  code,
  encryptedVaultPassword,
  privateKey,
  passphrase
}) {
  const {mainCipherPassword, mainIv} = await decryptMessage({
    encryptedMessage: userCredentials,
    privateKey,
    passphrase
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
