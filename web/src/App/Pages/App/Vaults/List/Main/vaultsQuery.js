import gql from 'graphql-tag'

export default gql`
  query personalVaults($filter: String, $page: BigInt, $limit: BigInt) {
    personalVaults(filter: $filter, page: $page, limit: $limit) {
      items {
        _id
        name
        createdAt
        fileCount
        storageUsed
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
