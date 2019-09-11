import React from 'react'
import apolloClient from './apollo'
import OrionsoftProvider from 'orionsoft-parts/lib/components/Provider'
import HooksApolloProvider from 'apollo-hooks/lib/ApolloProvider'
import TwoFactorPromptProvider from './TwoFactorPromptProvider'
import ErrorHandler from 'App/components/ErrorHandler'
import LocaleProvider from 'App/i18n/LocaleProvider'
import { ApolloProvider } from 'react-apollo'

export default function Root(props) {
  return (
    <LocaleProvider>
      <ApolloProvider client={apolloClient}>
        <HooksApolloProvider client={apolloClient}>
          <ErrorHandler>
            <OrionsoftProvider meProvider={false}>
              <TwoFactorPromptProvider>{props.children}</TwoFactorPromptProvider>
            </OrionsoftProvider>
          </ErrorHandler>
        </HooksApolloProvider>
      </ApolloProvider>
    </LocaleProvider>
  )
}
