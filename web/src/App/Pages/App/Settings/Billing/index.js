import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import EnrrolCard from './EnrrolCard'
import MutationButton from 'App/components/MutationButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'
import translate from 'App/i18n/translate'
import CreditCard from './CreditCard'
import UserWatcher from './UserWatcher'
import gql from 'graphql-tag'
import Plan from './Plan'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

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
@withMessage
export default class Billing extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    me: PropTypes.object
  }

  renderEnrollCard() {
    if (this.props.me.qvo.cardId) return
    return (
      <div className={styles.btnContainer}>
        <EnrrolCard />
      </div>
    )
  }

  renderCard() {
    if (!this.props.me.qvo.cardId) return
    return (
      <div className={styles.card}>
        <CreditCard
          data={this.props.me.cardData}
          firstName={this.props.me.name}
          lastName={this.props.me.name}
        />
        <MutationButton
          title={'Eliminar tarjeta'}
          message={'Está seguro de que desea eliminar esta tarjeta?'}
          params={{ userId: this.props.me._id }}
          confirmText={'Eliminar tarjeta'}
          mutation={'deleteCreditCard'}
          onSuccess={() => this.props.showMessage('Se ha eliminado tu tarjeta de crédito')}>
          <Button className={styles.removeCard} danger>
            Remover tarjeta
          </Button>
        </MutationButton>
      </div>
    )
  }

  render() {
    const { me } = this.props

    return (
      <div className={styles.container}>
        <UserWatcher userId={me._id} />
        <Section
          top
          title={translate('Tarjeta de crédito')}
          description={translate('Aqui puedes revisar los datos de tu tarjeta o agregar una')}>
          {this.renderEnrollCard()}
          {this.renderCard()}
        </Section>
        <div className={styles.divider} />
        <Section
          top
          title={translate('settings.plan')}
          description={translate('settings.planDescription')}>
          <Plan subscriptionId={me.qvo.subscriptionId} cardId={me.qvo.cardId} />
        </Section>
      </div>
    )
  }
}
