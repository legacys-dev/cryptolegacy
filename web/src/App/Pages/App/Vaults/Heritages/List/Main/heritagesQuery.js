import gql from 'graphql-tag'

export default gql`
  query getHeritages($vaultId: String, $filter: String, $page: BigInt, $limit: BigInt) {
    vaultPolicies(vaultId: $vaultId, filter: $filter, page: $page, limit: $limit) {
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
