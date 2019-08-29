import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import EnrrolCard from './EnrrolCard'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import Section from 'App/components/Section'
import Plan from './Plan'
import CreditCard from './CreditCard'
import Loading from 'App/components/Parts/Loading'

@withGraphQL(gql`
  query me {
    me {
      _id
      qvo {
        customerId
        cardId
        subscriptionId
      }
      cardData
      name
      name
    }
  }
`,
{loading: <Loading />}
)

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
    return (
      <div className={styles.container}>
        <Section
          top
          title={translate('settings.plan')}
          description={translate('settings.planDescription')}>
          <Plan subscriptionId={this.props.me.qvo.subscriptionId} />
        </Section>
        <Section
          top
          title={translate('Tarjeta de crédito')}
          description={translate('Aqui puedes revisar los datos de tu tarjeta o agregar una')}>
          {!this.props.me.qvo.cardId ? (
            this.renderEnrollCard()
          ) : (
            <CreditCard
              data={this.props.me.cardData}
              firstName={this.props.me.name}
              lastName={this.props.me.name}
            />
          )}
        </Section>
      </div>
    )
  }
}
