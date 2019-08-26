import gql from 'graphql-tag'

export default gql`
  query getVaults($credentialType: String) {
    getEncryptedVaults(credentialType: $credentialType)
  }
`
