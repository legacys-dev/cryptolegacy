import gql from 'graphql-tag'

export default gql`
  query files($filter: String, $vaultId: ID, $page: BigInt, $limit: BigInt) {
    files(filter: $filter, vaultId: $vaultId, page: $page, limit: $limit) {
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
