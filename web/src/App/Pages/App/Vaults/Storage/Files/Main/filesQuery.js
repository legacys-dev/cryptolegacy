import gql from 'graphql-tag'

export default gql`
  query getEncryptedFiles($vaultId: ID) {
    getEncryptedFiles(vaultId: $vaultId)
  }
`
