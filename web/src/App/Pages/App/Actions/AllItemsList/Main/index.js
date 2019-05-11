import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import Loading from 'App/components/Parts/Loading'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import Pagination from 'App/components/Parts/Pagination'
import {withApollo} from 'react-apollo'
import actionsQuery from './actionsQuery'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object
  }

  state = {}

  componentDidMount() {
    this.search()
  }

  @autobind
  async search(page = 1) {
    const {client} = this.props
    const result = await client.query({
      query: actionsQuery,
      variables: {page, limit: 6},
      fetchPolicy: 'network-only'
    })

    const {items, totalPages, hasNextPage, hasPreviousPage} = result.data.result

    this.setState({
      items,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage
    })
  }

  renderItems() {
    const {items, currentPage, totalPages, hasNextPage, hasPreviousPage} = this.state
    return (
      <div className={styles.container}>
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

  render() {
    if (!this.state.items || this.state.loading) return <Loading />
    if (isEmpty(this.state.items)) return <NoItemsFound message="actions.notFound" />
    return this.renderItems()
  }
}
