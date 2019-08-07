import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Header from 'App/components/Parts/Header'
import Information from './Information'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query file($fileId: ID) {
      file(fileId: $fileId) {
        _id
        data
        createdAt
        vaultName
      }
    }
  `,
  {loading: <Loading />}
)
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object
  }

  render() {
    const {file} = this.props
    if (!file) return <span />
    return (
      <div className={styles.container}>
        <Header past={{[`/vaults/storage/${file.data.vaultId}`]: `Bóveda - ${file.vaultName}`}}
          title={`Archivo - ${file.data.name}`}
        />
        <Information file={file} />
      </div>
    )
  }
}
