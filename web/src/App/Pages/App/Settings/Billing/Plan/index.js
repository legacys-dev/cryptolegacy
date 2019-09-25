import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import PlanModal from './PlanModal'
import MutationButton from 'App/components/MutationButton'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import Loading from 'App/components/Parts/Loading'
import plans from './PlanModal/plans'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query getSubscription {
      getSubscription
    }
  `,
  { loading: <Loading /> }
)
@withMessage
export default class Plan extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    getSubscription: PropTypes.object,
    cardId: PropTypes.string
  }

  state = {}

  async onCancelPlan() {
    this.props.showMessage('The plan was canceled successfully')
    await sleep(1000)
    window.location.reload()
  }

  renderFreePlan = () => (
    <div>
      <div>Por ahora tienes el plan gratuito, con él puedes hacer: </div>
      <div> - Solo puedes tener una bóveda</div>
      <div> - Almacenamiento de 100 MB </div>
      <div>
        Puedes actualizar tu cuenta a alguno de los planes que tenemos para tí, presionando en:{' '}
      </div>
    </div>
  )

  renderPlan = planId => {
    if (!planId) return
    const { title, size, seatsPrice, vaultsNum } = plans.find(plan => plan.id === planId)
    return (
      <div>
        <div>Por ahora tienes el plan {title}, con él puedes hacer: </div>
        <div> - Crear {vaultsNum} Bóvedas </div>
        <div> - Almacenamiento de {size} </div>
        <div>{planId === 'multiple' && `- Asientos por ${seatsPrice}`}</div>
      </div>
    )
  }

  renderActualPlan() {
    const { getSubscription, cardId } = this.props
    if (!getSubscription) return
    return (
      <div className={styles.getPlan}>
        {this.renderPlan(this.props.getSubscription.id)}
        <div className={styles.buttonsContainer}>
          <PlanModal
            subscriptionId={getSubscription.id}
            subscriptionData={getSubscription}
            cardId={cardId}
          />
          <MutationButton
            title={'Cancelar plan'}
            message={'Está seguro de cancelar su plan'}
            params={{ data: 'cancel' }} // Para que funcione.
            confirmText={'Cancelar plan'}
            mutation={'cancelPlan'}
            onSuccess={() => this.onCancelPlan()}
            label="Cancelar plan"
            danger
          />
        </div>
      </div>
    )
  }

  renderGetPlan() {
    if (this.props.getSubscription) return
    return (
      <div className={styles.noData}>
        {this.renderPlan('free')}
        <PlanModal cardId={this.props.cardId} />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderGetPlan()}
        {this.renderActualPlan()}
      </div>
    )
  }
}
