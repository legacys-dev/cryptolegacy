import gql from 'graphql-tag'
import {setSession} from '@orion-js/graphql-client'
import {deleteUserMessageKeys} from 'App/helpers/messageKeys'

export default async function() {
  await global.apolloClient.mutate({
    mutation: gql`
      mutation logout {
        logout
      }
    `
  })

  deleteUserMessageKeys()

  await setSession(null)
}
