import React from 'react'
import styles from './styles.css'
import PlanModal from './PlanModal'
import MutationButton from 'App/components/MutationButton'
import Loading from 'App/components/Parts/Loading'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import plans from './PlanModal/plans'

@withGraphQL(
  gql`
    query getSubscription {
      getSubscription
    }
  `,
  {loading: <Loading />}
)
export default class Plan extends React.Component {
  state = {}

  renderFreePlan = () => (
    <div>
      <div>Por ahora tienes el plan gratuito, con él puedes hacer: </div>
      <div> - Crear una bóveda </div>
      <div> - Almacenamiento de 100 MB </div>
      <div> - No puedes tener Asientos </div>
      <div>
        {' '}
        Puedes actualizar tu cuenta a alguno de los planes que tenemos para tí, presionando en:{' '}
      </div>
    </div>
  )

  renderPlan = planId => {
    const {title,size,seatsPrice,vaultsNum,integration} = plans.find((plan) => plan.id == planId)
    return (
      <div>
        <div>Por ahora tienes el plan {title}, con él puedes hacer: </div>
        <div> - Crear {vaultsNum} Bóvedas </div>
        <div> - Almacenamiento de {size} </div>
        <div> - {planId == 'free'? 'No puedes tener asientos': `Asientos por ${seatsPrice}`} </div>
        <div>
          {' '}
          Puedes actualizar tu cuenta a alguno de los planes que tenemos para tí, presionando en:{' '}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.subscriptionId ? (
          <div>
            {this.renderPlan(this.props.getSubscription.id)}
            <div className={styles.buttonsContainer}>
              <PlanModal
                subscriptionId={this.props.subscriptionId}
                subscriptionData={this.props.getSubscription}
              />
              <MutationButton
                title={'Cancelar plan'}
                message={'Está seguro de cancelar su plan'}
                params={{data: 'cancel'}} // Para que funcione.
                confirmText={'Cancelar plan'}
                mutation={'cancelPlan'}
                onSuccess={() => console.log('He cancelado el plan!')}
                label="Cancelar plan"
                danger
              />
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            {this.renderPlan('free')}
            <PlanModal />
          </div>
        )}
      </div>
    )
  }
}
