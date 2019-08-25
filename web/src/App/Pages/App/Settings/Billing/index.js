import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import EnrrolCard from './EnrrolCard'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query me {
    me {
      _id
      qvo {
        customerId
        cardId
      }
      cardData
    }
  }
`)
export default class Billing extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  renderEnrollCard() {
    return <EnrrolCard />
  }

  render() {
    if (!this.props.me.qvo.cardId) return this.renderEnrollCard()
    return <div className={styles.container}>datos de tarjeta</div>
  }
}
