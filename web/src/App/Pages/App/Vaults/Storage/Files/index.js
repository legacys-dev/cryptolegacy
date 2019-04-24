import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import FileManager from 'App/components/Parts/FileManager'
import {VaultProvider} from 'App/helpers/contexts/personalVaultContext'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Main from './Main'
import Loading from 'App/components/Parts/Loading'

@withGraphQL(
  gql`
    query personalVault($personalVaultId: ID) {
      personalVault(personalVaultId: $personalVaultId) {
        _id
        name
        fileCount
        storageUsed
      }
    }
  `,
  {loading: <Loading />}
)
export default class Files extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    personalVault: PropTypes.object
  }

  renderFileManager() {
    const {personalVaultId} = this.props.match.params
    return (
      <VaultProvider value={{userVaultId: personalVaultId}}>
        <FileManager />
      </VaultProvider>
    )
  }

  render() {
    const {personalVault} = this.props
    if (!personalVault) return <span />
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{[`/vaults`]: `Bóvedas`}} right={this.renderFileManager()}>
          {personalVault.name} - Archivos
        </Breadcrumbs>
        <Main />
      </div>
    )
  }
}
