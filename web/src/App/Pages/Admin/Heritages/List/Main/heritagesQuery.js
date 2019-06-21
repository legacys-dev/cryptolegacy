import gql from 'graphql-tag'

export default gql`
  query getHeritagesByAdmin(
    $adminPanel: Boolean
    $status: String
    $filter: String
    $page: BigInt
    $limit: BigInt
  ) {
    vaultPolicies(
      adminPanel: $adminPanel
      status: $status
      filter: $filter
      page: $page
      limit: $limit
    ) {
      items {
        _id
        data
        creatorEmail
      }
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`
