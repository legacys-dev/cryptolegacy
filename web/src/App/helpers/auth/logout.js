import gql from 'graphql-tag'
import { setSession } from '@orion-js/graphql-client'
import { deleteUserMessageKeys } from 'App/helpers/messageKeys'
import {
  deleteUserMainCipherPassword,
  deleteUserEncryptedPassword,
  deleteVaultPasswords
} from 'App/helpers/keys'

export default async () => {
  await global.apolloClient.mutate({
    mutation: gql`
      mutation appLogout {
        appLogout
      }
    `
  })

  deleteUserMessageKeys()
  deleteUserMainCipherPassword()
  deleteUserEncryptedPassword()
  deleteVaultPasswords()

  await setSession(null)
}
