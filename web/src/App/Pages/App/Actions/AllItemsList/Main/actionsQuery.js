import gql from 'graphql-tag'

export default gql`
  query activities($filter: String, $page: BigInt, $limit: BigInt) {
    result: activities(filter: $filter, page: $page, limit: $limit) {
      items {
        _id
        actions
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
