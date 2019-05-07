import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import FileManager from 'App/components/Parts/FileManager'
import {VaultProvider} from 'App/helpers/contexts/personalVaultContext'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import Text from 'App/components/fields/Text'
import VaultWatcher from './VaultWatcher'
import fragment from './fragment'
import gql from 'graphql-tag'
import Main from './Main'

@withGraphQL(
  gql`
    query personalVault($personalVaultId: ID) {
      personalVault(personalVaultId: $personalVaultId) {
        ...personalVaultData
      }
    }
    ${fragment}
  `,

  {loading: <Loading />}
)
export default class Files extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    personalVault: PropTypes.object
  }

  state = {}

  onFilterChange(searchValue) {
    this.setState({searchValue})
  }

  renderSearch() {
    return (
      <Text
        placeholder="Search"
        value={this.state.searchValue}
        onChange={searchValue => this.onFilterChange(searchValue)}
      />
    )
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
        <VaultWatcher personalVaultId={personalVault._id} />
        <Breadcrumbs past={{[`/vaults`]: `Bóvedas`}} right={this.renderFileManager()}>
          <div className={styles.title}>
            <div className={styles.subTitle}>{personalVault.name} - Archivos</div>
            <div className={styles.searchBar}>{this.renderSearch()}</div>
          </div>
        </Breadcrumbs>
        <Main personalVault={personalVault} filter={this.state.searchValue} />
      </div>
    )
  }
}
