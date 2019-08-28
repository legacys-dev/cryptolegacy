import React from 'react'
import styles from './styles.css'
import PlanModal from './PlanModal'
import Button from 'App/components/Parts/Button'

export default class Plan extends React.Component {
  
  state ={}

  renderFreePlan = () => (
    <div>
      <div>Por ahora tienes el plan gratuito, con él puedes hacer: </div>
      <div> - Crear una bóveda </div>
      <div> - Almacenamiento de 100 MB </div>
      <div> - No puedes tener Asientos </div>
      <div> Puedes actualizar tu cuenta a alguno de los planes que tenemos para tí, presionando en: </div>
    </div>
  )

  renderPlan = ({}) => (
    <div>Soy tu plan actual</div>
  )


  render() {
    return (
      <div>
        {this.props.subscriptionId ? (
          <div>
            <div> data </div>
            <div className={styles.buttonsContainer}>
              <PlanModal />
              <Button> Cancelar plan </Button>
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
