import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withApollo} from 'react-apollo'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Button from 'App/components/Parts/Button'
import Text from 'App/components/fields/Text'
import {withRouter} from 'react-router'
import Main from './Main'

@withApollo
@withRouter
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    client: PropTypes.object,
    location: PropTypes.object
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

  renderCreateButton() {
    return (
      <Button primary onClick={() => this.props.history.push('/vaults/create')}>
        Crear bóveda
      </Button>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs right={this.renderCreateButton()}>
          <div className={styles.title}>
            <div className={styles.subTitle}>Bóvedas</div>
            <div className={styles.searchBar}>{this.renderSearch()}</div>
          </div>
        </Breadcrumbs>
        <Main filter={this.state.searchValue} />
      </div>
    )
  }
}
