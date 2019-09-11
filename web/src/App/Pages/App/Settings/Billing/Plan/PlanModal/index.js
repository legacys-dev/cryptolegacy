import React from 'react'
import Button from 'App/components/Parts/Button'
import Modal from 'react-modal'
import styles from './styles.css'
import PlanDetail from './PlanDetail'
import plans from './plans'
import autobind from 'autobind-decorator'

export default class PlanModal extends React.Component {
  state = {
    modalIsOpen: false,
    plans: plans
  }

  @autobind
  openModal() {
    this.setState({ modalIsOpen: true })
  }
  @autobind
  closeModal() {
    this.setState({ modalIsOpen: false })
  }
  @autobind
  renderPlanList() {
    let plans = this.state.plans.filter((plan, index, arr) => plan.id !== 'free')
    if (this.props.subscriptionData) {
      plans = plans.filter((plan, index, arr) => plan.id !== this.props.subscriptionData.id)
    }
    return (
      <div className={styles.planListContainer}>
        {plans.map((planData, index) => {
          return (
            <PlanDetail
              key={'planDetail-' + index}
              {...planData}
              update={this.props.subscriptionData}
            />
          )
        })}
      </div>
    )
  }
  
  renderNoCard(){
    return (
      <p className={styles.noCreditCard}> No tienes tarjeta de crédito enlazada, asegurate de agregar una en la sección Tarjeta de crédito para contratar un plan</p>
    )
  } 

  render() {
    const customStyles = {
      content: {
        margin: 'auto auto',
        padding: '2px 2px',
        width: '60%',
        height: '80%',
        border: '0px'
      }
    }
    const noCreditCardStyles = {
      content: {
        margin: 'auto auto',
        display: 'flex',
        'justify-content':'center',
        padding: '2px 2px',
        width: '30%',
        height: '36%',
        border: '0px',
        'background-color':'#F4F6FC'
      }
    }
    return (
      <div>
        <Button className={styles.upgradeButton} onClick={this.openModal} primary>
          {!this.props.subscriptionId ? 'Suscribir plan' : 'Actualizar plan'}
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={!this.props.cardId ? noCreditCardStyles : customStyles}
          contentLabel="">
          <div className={styles.modalContent}>
            {this.props.cardId ? (
              this.renderPlanList()
            ) : this.renderNoCard()  }
            <Button className={styles.closeButtonContainer} onClick={this.closeModal} danger>
              Cerrar
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}
