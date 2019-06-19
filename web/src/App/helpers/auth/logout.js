import gql from 'graphql-tag'
import {setSession} from '@orion-js/graphql-client'
import {deleteUserMessageKeys} from 'App/helpers/messageKeys'
import {deleteUserMainCipherPassword} from 'App/helpers/keys'

export default async function() {
  await global.apolloClient.mutate({
    mutation: gql`
      mutation logout {
        logout
      }
    `
  })

  deleteUserMessageKeys()
  deleteUserMainCipherPassword()

  await setSession(null)
}
