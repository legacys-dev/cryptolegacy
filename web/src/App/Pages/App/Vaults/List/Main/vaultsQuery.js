import gql from 'graphql-tag'

export default gql`
  query getVaults($filter: String, $credentialType: String, $page: BigInt, $limit: BigInt) {
    vaults(filter: $filter, credentialType: $credentialType, page: $page, limit: $limit) {
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
