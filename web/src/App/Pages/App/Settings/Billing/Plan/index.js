import React from 'react'
import styles from './styles.css'
import PlanModal from './PlanModal'
import MutationButton from 'App/components/MutationButton'

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

  renderPlan = () => <div>Soy tu plan actual</div>

  render() {
    return (
      <div>
        {this.props.subscriptionId ? (
          <div>
            <div> data </div>
            <div className={styles.buttonsContainer}>
              <PlanModal update subscriptionId={this.props.subscriptionId}/>
              <MutationButton
                title={'Cancelar plan'}
                message={'Está seguro de cancelar su plan'}
                params={{data:"cancel"}} // Para que funcione. 
                confirmText={'Cancelar plan'}
                mutation={'cancelPlan'}
                onSuccess={() => console.log('He cancelado el plan!')}
                label="Cancelar plan"
                danger/>
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            {this.renderFreePlan()}
            <PlanModal />
          </div>
        )}
      </div>
    )
  }
}
