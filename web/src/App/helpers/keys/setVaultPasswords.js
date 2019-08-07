import {userDataDecryptWithPassword} from 'App/helpers/crypto'

export default async function(vaultId, vaultPassword) {
  const keys = window.localStorage.vault
  const userVaultsPasswords = keys ? JSON.parse(window.localStorage.vault) : {}
  const access = JSON.parse(window.localStorage.access)
  if (userVaultsPasswords[vaultId]) return
  const {mainCipherPassword, mainIv} = access

  const decrypted = userDataDecryptWithPassword({
    encryptedItem: vaultPassword,
    cipherPassword: mainCipherPassword,
    userDataIv: mainIv
  })

  userVaultsPasswords[vaultId] = decrypted

  window.localStorage.setItem('vault', JSON.stringify(userVaultsPasswords))
}
