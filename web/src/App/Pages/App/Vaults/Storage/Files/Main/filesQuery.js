import gql from 'graphql-tag'

export default gql`
  query files($filter: String, $personalVaultId: ID, $page: BigInt, $limit: BigInt) {
    files(filter: $filter, personalVaultId: $personalVaultId, page: $page, limit: $limit) {
      items {
        _id
        s3Data {
          name
          type
          size
          key
          deletedFromS3
        }
        getFromS3
        getFromB2
        storage
        createdAt
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
