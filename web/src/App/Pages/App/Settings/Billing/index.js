import React from 'react';
import styles from './styles.css';
import Button from 'App/components/Parts/Button';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import getRegistrationLinkQuery from './getRegistrationLinkQuery';

@withApollo
export default class Billing extends React.Component {
  static propTypes = {
    getRegistrationLink: PropTypes.object,
    client: PropTypes.object,
  }

  addCreditCard = () => {
    console.log('click')
    console.log('props: ', this.props.getRegistrationLink)
  }


  @autobind
  async getCardRegisterUrl() {
    const {client} = this.props
    const result = await client.query({
      query: getRegistrationLinkQuery,
      fetchPolicy: 'network-only'
    })
    console.log("result: ",result)
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
          <div>No tienes una cuenta bancaria asignada a tu cuenta</div>
          <div>
            <Button onClick={this.addCreditCard}> Añadir cuenta </Button>
          </div>
        </div>
      )
    }
  }
}
