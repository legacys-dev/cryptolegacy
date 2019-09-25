import { metaDataDecryptWithPassword as decrypt } from 'App/helpers/crypto'
import encryptedVaultsQuery from './encryptedVaultsQuery'

export default async (client, credentialType) => {
  const encrypted = await client.query({
    query: encryptedVaultsQuery,
    variables: credentialType,
    fetchPolicy: 'network-only'
  })

  const { getEncryptedVaults } = encrypted.data

  if (!getEncryptedVaults.items) return []

  const messages = JSON.parse(window.localStorage.getItem('messages'))

  const dataArray = decrypt({
    encryptedItem: getEncryptedVaults.items,
    cipherPassword: messages.communicationPassword
  })

  return dataArray
}
