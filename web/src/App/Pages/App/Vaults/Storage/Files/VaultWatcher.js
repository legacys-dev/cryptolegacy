import React from 'react'
import withSubscription from 'react-apollo-decorators/lib/withSubscription'
import gql from 'graphql-tag'
import fragment from './fragment'

@withSubscription(
  gql`
    subscription onEnvironmentUpdated($vaultId: ID) {
      filesVaultUpdated(vaultId: $vaultId) {
        ...vaultData
      }
    }
    ${fragment}
  `
)
export default class VaultWatcher extends React.Component {
  render() {
    return <span />
  }
}
