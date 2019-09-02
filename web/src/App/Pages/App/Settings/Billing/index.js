import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import EnrrolCard from './EnrrolCard'
import MutationButton from 'App/components/MutationButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'
import CreditCard from './CreditCard'
import translate from 'App/i18n/translate'
import gql from 'graphql-tag'
import Plan from './Plan'

@withGraphQL(
  gql`
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
      }
    }
  `,
  { loading: <Loading /> }
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
          title={translate('Tarjeta de crédito')}
          description={translate('Aqui puedes revisar los datos de tu tarjeta o agregar una')}>
          {!this.props.me.qvo.cardId ? (
            this.renderEnrollCard()
          ) : (
            <div>
              <CreditCard
                data={this.props.me.cardData}
                firstName={this.props.me.name}
                lastName={this.props.me.name}
              />
              <MutationButton
                title={'Eliminar tarjeta'}
                message={'Está seguro de que desea eliminar esta tarjeta?'}
                params={{ userId: this.props.me['_id'] }} // Para que funcione.
                confirmText={'Eliminar tarjeta'}
                mutation={'deleteCreditCard'}
                onSuccess={() => console.log('He eliminado la tarjeta')}>
                <Button className={styles.removeCard} danger>
                  {' '}
                  Remover tarjeta{' '}
                </Button>
              </MutationButton>
            </div>
          )}
        </Section>
        <div className={styles.divider} />
        <Section
          top
          title={translate('settings.plan')}
          description={translate('settings.planDescription')}>
          <Plan subscriptionId={this.props.me.qvo.subscriptionId} />
        </Section>
      </div>
    )
  }
}
