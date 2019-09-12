import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import autobind from 'autobind-decorator'
import NoItemsFound from 'App/components/Parts/NoItemsFound'
import { metaDataDecryptWithPassword as decrypt } from 'App/helpers/crypto'
import actionsQuery from './actionsQuery'
import Pagination from 'App/components/Parts/Pagination'
import { getPageItems } from 'App/functions/paginated'
import Loading from 'App/components/Parts/Loading'
import { withApollo } from 'react-apollo'
import isEmpty from 'lodash/isEmpty'
import Items from './Items'
import { selectHttpOptionsAndBody } from 'apollo-link-http-common';

@withApollo
export default class Main extends React.Component {
  static propTypes = {
    client: PropTypes.object
  }

  state = {loading:true, encrypt:false}

  componentDidMount() {
    this.search()
  }

  @autobind
  async search(page = 1) {
    const { client } = this.props
    const encrypted = await client.query({
      query: actionsQuery,
      fetchPolicy: 'network-only'
    })

    const { getEncryptedActivities } = encrypted.data

    if (!getEncryptedActivities.items) {
      this.setState({ items: [] })
      return
    }

    const messages = JSON.parse(window.localStorage.getItem('messages'))

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    let metadataProm = new Promise(resolve => {
      this.setState({encrypt:true},async () =>{
        const dataArray = decrypt({
          encryptedItem: getEncryptedActivities.items,
          cipherPassword: messages.communicationPassword
        })
        await sleep(3000)
        resolve(getPageItems(dataArray, page, 6))
      })
      
      
    })
    metadataProm.then(result => {
      const { items, totalPages, hasNextPage, hasPreviousPage } = result;
      this.setState({
        items,
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPreviousPage,
        loading:false
      });
    })
    
  }

  renderItems() {
    const { items, currentPage, totalPages, hasNextPage, hasPreviousPage } = this.state
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

  encryptLoading = () =>{
    return(
      <div className={styles.decryptLoading}>
        <Loading />
        <div>Desencriptando...</div>
      </div>
    )
  }

  render() {
    if (this.state.loading) {
      if(this.state.encrypt){
        return this.encryptLoading()
      }else{
        return <Loading />
      }
    }
    if (isEmpty(this.state.items)) return <NoItemsFound message="actions.notFound" />
    return this.renderItems()
  }
}
