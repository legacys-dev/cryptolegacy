import gql from 'graphql-tag'

export default gql`
  query getEncryptedFiles($deletedFiles: Boolean) {
    getEncryptedFiles(deletedFiles: $deletedFiles)
  }
`
