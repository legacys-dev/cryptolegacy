import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withApollo} from 'react-apollo'
import vaultsQuery from './vaultsQuery'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Button from 'App/components/Parts/Button'
import {withRouter} from 'react-router'
import Pagination from 'App/components/Parts/Pagination'
import Items from './Items'
import autobind from 'autobind-decorator'

@withApollo
@withRouter
export default class List extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    client: PropTypes.object,
    location: PropTypes.object
  }

  state = {filter: null}

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.search()
    }
  }

  @autobind
  async search(page = 1) {
    const {filter} = this.state
    const result = await this.props.client.query({
      query: vaultsQuery,
      variables: {filter, page, limit: 6},
      fetchPolicy: 'network-only'
    })
    const {items, totalPages, hasNextPage, hasPreviousPage} = result.data.personalVaults
    this.setState({
      items,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage
    })
  }

  renderCreateButton() {
    return (
      <Button primary onClick={() => this.props.history.push('/vaults/create')}>
        Crear bóveda
      </Button>
    )
  }

  render() {
    const {items, currentPage, totalPages, hasNextPage, hasPreviousPage} = this.state
    return (
      <div className={styles.container}>
        <Breadcrumbs right={this.renderCreateButton()}>Bóvedas</Breadcrumbs>
        <Items items={items} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          search={this.search}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    )
  }
}
