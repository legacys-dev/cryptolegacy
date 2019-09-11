import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import { metaDataDecryptWithPassword as decrypt } from 'App/helpers/crypto'
import encryptedVaultsQuery from './encryptedVaultsQuery'
import Pagination from 'App/components/Parts/Pagination'
import { getPageItems } from 'App/functions/paginated'
import Loading from 'App/components/Parts/Loading'
import { withApollo } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'
import { nameSearch } from 'App/helpers/search'

async function getQuery(client, credentialType) {
  const encrypted = await client.query({
    query: encryptedVaultsQuery,
    variables: credentialType,
    fetchPolicy: 'network-only'
  })

  const { getEncryptedVaults } = encrypted.data
  if (!getEncryptedVaults.items) {
    return []
  }

  const messages = JSON.parse(window.localStorage.getItem('messages'))
  const dataArray = decrypt({
    encryptedItem: getEncryptedVaults.items,
    cipherPassword: messages.communicationPassword
  })
  return dataArray
}

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object,
    filter: PropTypes.string,
    credentialType: PropTypes.string
  }

  state = {}

  componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.credentialType !== this.props.credentialType) this.search()
    if (prevProps.filter !== this.props.filter) this.search()
  }

  @autobind
  async search(page = 1) {
    const { client, credentialType, filter } = this.props

    const items = filter
      ? nameSearch(filter, this.state.allItems)
      : await getQuery(client, { credentialType })

    const { totalPages, hasNextPage, hasPreviousPage } = getPageItems(items, page, 6)

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
        <div>
          <Items items={items} credentialType={this.props.credentialType} />
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
