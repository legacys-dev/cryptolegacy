import {metaDataDecryptWithPassword as decrypt} from 'App/helpers/crypto'

export default async (client, match, filesQuery) => {
  const encrypted = await client.query({
    query: filesQuery,
    variables: match,
    fetchPolicy: 'network-only'
  })

  const {getEncryptedFiles} = encrypted.data

  if (!getEncryptedFiles.items) return []

  const messages = JSON.parse(window.localStorage.getItem('messages'))

  const dataArray = decrypt({
    encryptedItem: getEncryptedFiles.items,
    cipherPassword: messages.communicationPassword
  })

  return dataArray
}
