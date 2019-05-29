import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Button from 'App/components/Parts/Button'
import {withRouter} from 'react-router'
import VaultType from './VaultType'
import autobind from 'autobind-decorator'
import Main from './Main'

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

  renderCreateVault() {
    if (this.state.credentialType === 'heritage') return
    return (
      <Button primary onClick={() => this.props.history.push('/vaults/create')}>
        Crear bóveda
      </Button>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs right={this.renderCreateVault()}>
          <div className={styles.title}>
            <div className={styles.subTitle}>Bóvedas</div>
            <div className={styles.searchBar}>
              <VaultType
                onVaultTypeChange={this.onVaultTypeChange}
                onFilterChange={this.onFilterChange}
                vaultTypeValue={this.state.credentialType}
                filterValue={this.state.searchValue}
              />
            </div>
          </div>
        </Breadcrumbs>
        <Main filter={this.state.searchValue} credentialType={this.state.credentialType} />
      </div>
    )
  }
}
