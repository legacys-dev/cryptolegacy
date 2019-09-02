import React from 'react'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import { withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import getRegistrationLinkQuery from './getRegistrationLinkQuery'

@withApollo
export default class Billing extends React.Component {
  static propTypes = {
    getRegistrationLink: PropTypes.object,
    client: PropTypes.object
  }

  state = {}

  addCreditCard(url) {
    window.open(url)
  }

  @autobind
  async getCardRegisterUrl() {
    try {
      const result = await this.props.client.query({
        query: getRegistrationLinkQuery,
        fetchPolicy: 'network-only'
      })

      this.addCreditCard(result.data.result)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Button primary onClick={this.getCardRegisterUrl}>
          Registrar tarjeta
        </Button>
      </div>
    )
  }
}
