import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import EnrrolCard from './EnrrolCard'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Section from 'App/components/Section'
import Plan from './Plan'

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
    return (
      <div className={styles.btnContainer}>
        <EnrrolCard />
      </div>
    )
  }

  render() {
    if (!this.props.me.qvo.cardId) return this.renderEnrollCard()
    return (
      <div className={styles.container}>
        <Section
          top
          title={translate('settings.plan')}
          description={translate('settings.planDescription')}>
          <Plan />
        </Section>
      </div>
    )
  }
}
