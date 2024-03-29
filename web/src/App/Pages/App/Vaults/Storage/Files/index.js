import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Header from 'App/components/Parts/Header'
import FileManager from 'App/components/Parts/FileManager'
import { VaultProvider } from 'App/helpers/contexts/vaultContext'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { isOwnerOrAdministrator } from 'App/helpers/user'
import { setVaultPasswords } from 'App/helpers/keys'
import Loading from 'App/components/Parts/Loading'
import Text from 'App/components/fields/Text'
import VaultWatcher from './VaultWatcher'
import translate from 'App/i18n/translate'
import gql from 'graphql-tag'
import Main from './Main'

@withGraphQL(
  gql`
    query getVault($vaultId: ID) {
      vault(vaultId: $vaultId) {
        _id
        name
        type
        fileCount
        storageUsed
        password
        userCredentials
      }
    }
  `,
  { loading: <Loading /> }
)
export default class Files extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    vault: PropTypes.object
  }

  componentDidMount() {
    const { vault } = this.props
    setVaultPasswords(vault._id, vault.password)
  }

  state = {}

  onFilterChange(searchValue) {
    this.setState({ searchValue })
  }

  renderSearch() {
    return (
      <Text
        placeholder={translate('vaults.search')}
        value={this.state.searchValue}
        onChange={searchValue => this.onFilterChange(searchValue)}
      />
    )
  }

  renderFileManager() {
    const { _id, type } = this.props.vault
    return (
      <VaultProvider value={{ vaultId: _id, vaultType: type }}>
        <FileManager />
      </VaultProvider>
    )
  }

  fileManagerAccess() {
    if (!isOwnerOrAdministrator(this.props.vault.userCredentials)) return
    return this.renderFileManager()
  }

  renderRight() {
    return (
      <div className={styles.rightContainer}>
        <div className={styles.searchBar}> {this.renderSearch()} </div>
        <div> {this.fileManagerAccess()} </div>
      </div>
    )
  }

  render() {
    const { vault } = this.props
    if (!vault) return <span />
    return (
      <div className={styles.container}>
        <VaultWatcher vaultId={vault._id} />
        <Header
          past={{ [`/vaults`]: translate('vaults.vaults') }}
          right={this.renderRight()}
          title={`${vault.name} - (${translate('vaults.files')})`}
        />
        <Main vault={vault} filter={this.state.searchValue} />
      </div>
    )
  }
}
