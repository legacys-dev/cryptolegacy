import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import Loading from 'App/components/Parts/Loading'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import Pagination from 'App/components/Parts/Pagination'
import { getPageItems } from 'App/functions/paginated'
import { withApollo } from 'react-apollo'
import filesQuery from './filesQuery'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'
import { getQuery, nameSearch } from 'App/helpers/search'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    filter: PropTypes.string,
    emptyTrashDate: PropTypes.func,
    onQueryItems: PropTypes.func
  }

  state = {}

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) this.search()
    if (prevProps.emptyTrashDate !== this.props.emptyTrashDate) this.search()
    if (prevState.updateDate !== this.state.updateDate) this.search(this.state.currentPage)
  }

  @autobind
  onUpdateArchive(updateDate) {
    this.setState({ updateDate })
  }

  @autobind
  async search(page = 1) {
    const { client, onQueryItems, filter } = this.props
    const deletedFiles = true

    const items = filter
      ? nameSearch(filter, this.state.allItems)
      : await getQuery(client, { deletedFiles }, filesQuery)

    const { totalPages, hasNextPage, hasPreviousPage } = getPageItems(items, page, 6)

    onQueryItems(items.length)

    const allItems = filter ? {} : { allItems: items }

    this.setState({
      items,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      ...allItems
    })
  }

  renderItems() {
    const { items, currentPage, totalPages, hasNextPage, hasPreviousPage } = this.state
    return (
      <div className={styles.container}>
        <Items items={items} onUpdateArchive={this.onUpdateArchive} />
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
    if (isEmpty(this.state.items)) return <NoItemsFound message="files.notFound" />
    return this.renderItems()
  }
}
