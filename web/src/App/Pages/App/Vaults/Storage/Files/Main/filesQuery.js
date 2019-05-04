import gql from 'graphql-tag'

export default gql`
  query files($filter: String, $personalVaultId: ID, $page: BigInt, $limit: BigInt) {
    files(filter: $filter, personalVaultId: $personalVaultId, page: $page, limit: $limit) {
      items {
        _id
        data
        createdAt
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
