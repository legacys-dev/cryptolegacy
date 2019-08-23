import React from 'react'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import {withApollo} from 'react-apollo'
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

  addCreditCard = () => {
    window.open(this.state.regUrl)
  }

  @autobind
  async getCardRegisterUrl() {
    const {client} = this.props
    const result = await client.query({
      query: getRegistrationLinkQuery,
      fetchPolicy: 'network-only'
    })
    if (result.data.result) {
      this.setState({regUrl: result.data.result})
    } else {
      console.log('Error, no register url.')
    }
  }

  componentDidMount() {
    this.getCardRegisterUrl()
  }

  render() {
    const userBilling = false
    if (userBilling) {
      return <div className={styles.container}>Datos del usuario...</div>
    } else {
      return (
        <div className={styles.container}>
          <div href={this.state.regUrl} target="blank">
            No tienes una cuenta bancaria asignada a tu cuenta
          </div>
          <a className={styles.btnAdd} href={this.state.regUrl} target="blank">
            <Button> Añadir cuenta </Button>
          </a>
        </div>
      )
    }
  }
}
