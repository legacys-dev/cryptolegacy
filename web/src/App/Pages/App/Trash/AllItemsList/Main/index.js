import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import Loading from 'App/components/Parts/Loading'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import Pagination from 'App/components/Parts/Pagination'
import {withApollo} from 'react-apollo'
import filesQuery from './filesQuery'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    filter: PropTypes.string
  }

  state = {}

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      this.search()
    }
    if (prevState.fileId !== this.state.fileId) {
      this.search(this.state.currentPage)
    }
  }

  @autobind
  onUpdateArchive(fileId) {
    this.setState({fileId})
  }

  @autobind
  async search(page = 1) {
    const {filter, client} = this.props
    const result = await client.query({
      query: filesQuery,
      variables: {filter, deletedFiles: true, page, limit: 6},
      fetchPolicy: 'network-only'
    })
    const {items, totalPages, hasNextPage, hasPreviousPage} = result.data.files
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
