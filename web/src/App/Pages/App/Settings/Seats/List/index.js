import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import { withApollo } from 'react-apollo'
import Loading from 'App/components/Parts/Loading'
import { getPageItems } from 'App/functions/paginated'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Pagination from 'App/components/Parts/Pagination'
import seatsQuery from './seatsQuery'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'

@withApollo
@withMessage
export default class List extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    client: PropTypes.object,
    newSeatId: PropTypes.string
  }

  state = {}

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lastSeatId !== this.state.lastSeatId) this.search()
    if (prevProps.newSeatId !== this.props.newSeatId) this.search()
  }

  @autobind
  cancelSeat(lastSeatId) {
    this.props.showMessage('You canceled the seat successfully')
    this.setState({ lastSeatId })
  }

  @autobind
  async search(page = 1) {
    const { client } = this.props
    const response = await client.query({
      query: seatsQuery,
      variables: {},
      fetchPolicy: 'network-only'
    })

    const items = response.data.getSeats
    const { totalPages, hasNextPage, hasPreviousPage } = getPageItems(items, page, 6)

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
        <div>
          <Items items={items} cancelSeat={this.cancelSeat} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            search={this.search}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </div>
      </div>
    )
  }

  render() {
    if (!this.state.items || this.state.loading) return <Loading />
    if (isEmpty(this.state.items)) return <NoItemsFound message="vaults.notFound" />
    return this.renderItems()
  }
}
