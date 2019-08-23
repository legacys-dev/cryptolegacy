import gql from 'graphql-tag'

export default gql`
  query getVaults($credentialType: String, $page: BigInt, $limit: BigInt) {
    vaults(credentialType: $credentialType, page: $page, limit: $limit) {
      items {
        _id
        data
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
