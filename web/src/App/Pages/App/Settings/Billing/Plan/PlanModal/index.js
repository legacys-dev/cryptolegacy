import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Modal from 'react-modal'
import PlanDetail from './PlanDetail'
import autobind from 'autobind-decorator'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Button from 'App/components/Parts/Button'
import plans from './plans'

@withMessage
export default class PlanModal extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func
  }

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
  async updatedPlan() {
    this.props.showMessage('Plan actualizado')
    await sleep(1000)
    window.location.reload()
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
              update={this.props.subscriptionData}
              {...planData}
              updatedPlan={this.updatedPlan}
            />
          )
        })}
      </div>
    )
  }

  renderNoCard() {
    return (
      <p className={styles.noCreditCard}>
        No tienes tarjeta de crédito enlazada, asegurate de agregar una en la sección Tarjeta de
        crédito para contratar un plan
      </p>
    )
  }

  render() {
    const customStyles = {
      content: {
        height: '100%',
        width: '100%',
        top: '0px',
        right: '0px',
        left: '0px',
        bottom: '0px',
        border: 'none',
        position: 'relative',
        'background-color': '#000000bf'
      }
    }

    const noCreditCardStyles = {
      content: {
        margin: 'auto auto',
        display: 'flex',
        'justify-content': 'center',
        padding: '2px 2px',
        width: '30%',
        height: '24%',
        border: '0px',
        'background-color': '#000000bf'
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
            {this.props.cardId ? this.renderPlanList() : this.renderNoCard()}
            <div className={styles.button}>
              <Button className={styles.closeButtonContainer} onClick={this.closeModal} danger>
                Cerrar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
