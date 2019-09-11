import gql from 'graphql-tag'

export default gql`
  fragment vaultData on Vault {
    _id
    name
    type
    fileCount
    storageUsed
    userCredentials
  }
`
