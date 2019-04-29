import gql from 'graphql-tag'

export default gql`
  fragment personalVaultData on PersonalVault {
    _id
    name
    fileCount
    storageUsed
  }
`
