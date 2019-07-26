import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import FileManager from 'App/components/Parts/FileManager'
import {VaultProvider} from 'App/helpers/contexts/vaultContext'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import Text from 'App/components/fields/Text'
import VaultWatcher from './VaultWatcher'
import fragment from './fragment'
import gql from 'graphql-tag'
import Main from './Main'
import translate from 'App/i18n/translate'

@withGraphQL(
  gql`
    query getVault($vaultId: ID) {
      vault(vaultId: $vaultId) {
        ...vaultData
      }
    }
    ${fragment}
  `,

  {loading: <Loading />}
)
export default class Files extends React.Component {
  static propTypes = {
    match: PropTypes.object,
    vault: PropTypes.object
  }

  state = {}

  onFilterChange(searchValue) {
    this.setState({searchValue})
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
    const {vaultId} = this.props.match.params
    return (
      <VaultProvider value={{vaultId}}>
        <FileManager />
      </VaultProvider>
    )
  }

  fileManagerAccess() {
    const {vault} = this.props
    if (vault.userCredentials !== 'owner') return
    return this.renderFileManager()
  }

  render() {
    const {vault} = this.props
    if (!vault) return <span />
    return (
      <div className={styles.container}>
        <VaultWatcher vaultId={vault._id} />
        <Breadcrumbs past={{[`/vaults`]: translate('vaults.vaults')}} right={this.fileManagerAccess()}>
          <div className={styles.title}>
            <div className={styles.subTitle}>{vault.name} - ({translate('vaults.files')})</div>
            <div className={styles.searchBar}>{this.renderSearch()}</div>
          </div>
        </Breadcrumbs>
        <Main vault={vault} filter={this.state.searchValue} />
      </div>
    )
  }
}
