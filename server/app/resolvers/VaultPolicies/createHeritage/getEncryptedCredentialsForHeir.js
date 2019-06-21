import {decryptMessage} from 'app/helpers/openPgp'
import {userDataEncryptWithPassword, userDataDecryptWithPassword} from 'app/helpers/crypto'
import {generateHeritagePassword} from 'app/helpers/keys'

// DONT TOUCH THIS CODE
export default async function({
  privateKey,
  passphrase,
  ownerEncryptedCredentials,
  encryptedVaultCredentials,
  heirCode
}) {
  const {mainCipherPassword, mainIv} = await decryptMessage({
    encryptedMessage: ownerEncryptedCredentials,
    privateKey,
    passphrase
  })

  const toDecryptParams = {
    encryptedItem: encryptedVaultCredentials,
    cipherPassword: mainCipherPassword,
    userDataIv: mainIv
  }

  const decryptedVaultPassword = userDataDecryptWithPassword(toDecryptParams)
  const {claimPassword, claimIv} = await generateHeritagePassword(heirCode)

  const encryptParams = {
    itemToEncrypt: decryptedVaultPassword,
    cipherPassword: claimPassword,
    userDataIv: claimIv
  }

  return userDataEncryptWithPassword(encryptParams)
}
