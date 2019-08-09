import gql from 'graphql-tag'

export default gql`
  query files($filter: String, $deletedFiles: Boolean, $page: BigInt, $limit: BigInt) {
    files(filter: $filter, deletedFiles: $deletedFiles, page: $page, limit: $limit) {
      items {
        _id
        data
        vaultName
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
