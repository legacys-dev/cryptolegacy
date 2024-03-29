import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import Pagination from 'App/components/Parts/Pagination'
import Loading from 'App/components/Parts/Loading'
import heritagesQuery from './heritagesQuery'
import { withApollo } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    vaultId: PropTypes.string,
    filter: PropTypes.string
  }

  state = {}

  componentDidMount() {
    this.search()
  }

  @autobind
  onDeleteItem(onDeletedItem) {
    this.setState({ onDeletedItem })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) this.search()
    if (prevState.onDeletedItem !== this.state.onDeletedItem) this.search()
  }

  @autobind
  async search(page = 1) {
    const { vaultId, filter, client } = this.props
    const result = await client.query({
      query: heritagesQuery,
      variables: { vaultId, type: 'heritage', filter, page, limit: 6 },
      fetchPolicy: 'network-only'
    })

    const { items, totalPages, hasNextPage, hasPreviousPage } = result.data.vaultPolicies

    this.setState({
      items,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage
    })
  }

  renderItems() {
    const { items, currentPage, totalPages, hasNextPage, hasPreviousPage } = this.state
    return (
      <div className={styles.container}>
        <Items items={items} onDeleteItem={this.onDeleteItem} />
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
    if (isEmpty(this.state.items)) return <NoItemsFound message="heritages.notFound" />
    return this.renderItems()
  }
}
