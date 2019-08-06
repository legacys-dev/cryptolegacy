import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Header from 'App/components/Parts/Header'
import Button from 'App/components/Parts/Button'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import VaultType from './VaultType'
import Main from './Main'
import {FiPlus} from 'react-icons/fi'
import translate from 'App/i18n/translate'

@withRouter
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {credentialType: 'owner'}

  @autobind
  onFilterChange(searchValue) {
    this.setState({searchValue})
  }

  @autobind
  onVaultTypeChange(credentialType) {
    this.setState({credentialType})
  }

  renderRigth() {
    const renderCreateVault = () => {
      if (this.state.credentialType === 'heritage') return
      return (
        <Button primary icon={FiPlus} onClick={() => this.props.history.push('/vaults/create')}>
          {translate('vaults.createVault')}
        </Button>
      )
    }
    return (
      <div className={styles.renderRigth}>
        <div className={styles.searchBar}>
          <VaultType
            onVaultTypeChange={this.onVaultTypeChange}
            onFilterChange={this.onFilterChange}
            vaultTypeValue={this.state.credentialType}
            filterValue={this.state.searchValue}
          />
        </div>
        {renderCreateVault()}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <Header right={this.renderRigth()}
            title={translate('vaults.vaults')}
            description={'Aqui va la descripcion'}
          />
        </div>
        <Main filter={this.state.searchValue} credentialType={this.state.credentialType} />
      </div>
    )
  }
}
