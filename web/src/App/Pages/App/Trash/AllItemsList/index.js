import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import EmptyTrash from 'App/components/Parts/EmptyTrash'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import forceLogin from 'App/helpers/auth/forceLogin'
import Text from 'App/components/fields/Text'
import autobind from 'autobind-decorator'
import gql from 'graphql-tag'
import Main from './Main'

import crypto from 'crypto'
import Button from 'App/components/Parts/Button'

@forceLogin
@withGraphQL(gql`
  query me {
    me {
      _id
      email
    }
  }
`)
@withMessage
export default class AllItemsList extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {}

  @autobind
  onQueryItems(filesCount) {
    this.setState({filesCount})
  }

  @autobind
  onDeleteSuccess() {
    this.setState({emptyTrashDate: new Date()})
    this.props.showMessage('Se han eliminado los archivos correctamente')
  }

  onFilterChange(searchValue) {
    this.setState({searchValue})
  }

  @autobind
  encrypt() {
    const key = crypto.randomBytes(32)
    const iv = crypto.randomBytes(16)

    // const message = Buffer.alloc(1024 * 1024 * 10)
    const message = '1 2 3 4 5 6 - /'

    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
    let encrypted = cipher.update(message)

    encrypted = Buffer.concat([encrypted, cipher.final()])
    const encryptedFinal = {iv: iv.toString('hex'), encryptedData: encrypted}

    let newIv = Buffer.from(encryptedFinal.iv, 'hex')
    let encryptedText = encryptedFinal.encryptedData

    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), newIv)
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()]).toString()

    console.log('here')
    console.log(encryptedText.toString('hex'))
    console.log(decrypted)
    // console.log(message.length)
    // console.log(decrypted.length)
  }

  renderSearch() {
    return (
      <Text
        placeholder="Search"
        value={this.state.searchValue}
        onChange={searchValue => this.onFilterChange(searchValue)}
      />
    )
  }

  render() {
    const {searchValue, emptyTrashDate, filesCount} = this.state
    return (
      <div className={styles.container}>
        <Breadcrumbs
          right={
            <EmptyTrash
              onDeleteSuccess={this.onDeleteSuccess}
              userId={this.props.me._id}
              filesCount={filesCount}
            />
          }>
          <div className={styles.title}>
            <div className={styles.subTitle}>Archivos en eliminación</div>
            <div className={styles.searchBar}>{this.renderSearch()}</div>
          </div>
        </Breadcrumbs>
        <Main
          filter={searchValue}
          emptyTrashDate={emptyTrashDate}
          onQueryItems={this.onQueryItems}
        />
        <Button onClick={this.encrypt}>encrypt</Button>
      </div>
    )
  }
}
