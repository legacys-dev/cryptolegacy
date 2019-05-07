import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withApollo} from 'react-apollo'
import Pagination from 'App/components/Parts/Pagination'
import {VaultProvider} from 'App/helpers/contexts/personalVaultContext'
import isEmpty from 'lodash/isEmpty'
import NoItemsFound from './Items/NoItemsFound'
import Loading from 'App/components/Parts/Loading'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import filesQuery from './filesQuery'
import Items from './Items'

@withApollo
@withRouter
export default class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    client: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    personalVault: PropTypes.object,
    filter: PropTypes.string
  }

  state = {filter: null}

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) this.search()
    if (prevProps !== this.props) this.search(this.state.currentPage)
  }

  @autobind
  async search(page = 1) {
    const {client, filter, match} = this.props
    const {personalVaultId} = match.params
    this.setState({loading: true})
    const result = await client.query({
      query: filesQuery,
      variables: {filter, personalVaultId, page, limit: 6},
      fetchPolicy: 'network-only'
    })
    const {items, totalPages, hasNextPage, hasPreviousPage} = result.data.files
    this.setState({
      items,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      loading: false
    })
  }

  renderItems() {
    const {personalVaultId} = this.props.match.params
    const {items, currentPage, totalPages, hasNextPage, hasPreviousPage, filter} = this.state
    return (
      <div className={styles.container}>
        <VaultProvider value={{userVaultId: personalVaultId}}>
          <Items items={items} searchValue={filter} onSearch={this.onSearch} />
        </VaultProvider>
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
    if (isEmpty(this.state.items)) return <NoItemsFound />
    return this.renderItems()
  }
}
