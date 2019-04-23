import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withApollo} from 'react-apollo'
import Pagination from 'App/components/Parts/Pagination'
import {VaultProvider} from 'App/helpers/contexts/personalVaultContext'
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
    match: PropTypes.object
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
    const {personalVaultId} = this.props.match.params
    const result = await this.props.client.query({
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
      hasPreviousPage
    })
  }

  render() {
    const {personalVaultId} = this.props.match.params
    const {items, currentPage, totalPages, hasNextPage, hasPreviousPage} = this.state
    return (
      <div className={styles.container}>
        <VaultProvider value={{userVaultId: personalVaultId}}>
          <Items items={items} />
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
}
