import gql from 'graphql-tag'

export default gql`
  query getInvitations(
    $vaultId: String
    $status: String
    $type: String
    $filter: String
    $page: BigInt
    $limit: BigInt
  ) {
    vaultPolicies(
      vaultId: $vaultId
      status: $status
      type: $type
      filter: $filter
      page: $page
      limit: $limit
    ) {
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
