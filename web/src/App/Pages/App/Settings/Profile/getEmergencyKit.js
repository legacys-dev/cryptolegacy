import gql from 'graphql-tag'

export default gql`
  query getEmergencyKit {
    result: getEmergencyKit{
      key,
      data
    }
  }
`
