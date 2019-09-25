import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import { metaDataDecryptWithPassword as decrypt } from 'App/helpers/crypto'
import Pagination from 'App/components/Parts/Pagination'
import { getPageItems } from 'App/functions/paginated'
import Loading from 'App/components/Parts/Loading'
import invitationsQuery from './invitationsQuery'
import { withApollo } from 'react-apollo'
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mustUpdate !== this.state.mustUpdate) this.search()
  }

  onUpdate = change => {
    this.setState({ mustUpdate: change })
  }

  @autobind
  async search(page = 1) {
    const { client } = this.props
    const response = await client.query({
      query: invitationsQuery,
      fetchPolicy: 'network-only'
    })

    const { myPendingInvitations } = response.data

    if (!myPendingInvitations.items) {
      this.setState({ items: [] })
      return
    }
    // const messages = JSON.parse(window.localStorage.getItem('messages'))
    // const dataArray = decrypt({
    //   encryptedItem: getEncryptedActivities.items,
    //   cipherPassword: messages.communicationPassword
    // })

    const { items, totalPages, hasNextPage, hasPreviousPage } = getPageItems(
      myPendingInvitations.items,
      page,
      6
    )

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
        <Items items={items} onUpdate={this.onUpdate} />
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
    if (isEmpty(this.state.items)) return <NoItemsFound message="invitations.emptyInvitations" />
    return this.renderItems()
  }
}
