import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Information from './Information'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query file($fileId: ID) {
    file(fileId: $fileId) {
      _id
      data
      createdAt
      vaultName
    }
  }
`)
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object
  }

  render() {
    const {file} = this.props
    if (!file) return <span />
    return (
      <div className={styles.container}>
        <Breadcrumbs
          past={{[`/vaults/storage/${file.data.vaultId}`]: `Bóveda - ${file.vaultName}`}}>
          Archivo - {file.data.name}
        </Breadcrumbs>
        <Information file={file} />
      </div>
    )
  }
}
