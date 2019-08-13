import gql from 'graphql-tag'

export default gql`
  query getPdf(
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
      _id,
      data,
      hasPreviousPage
    }
  }
`
