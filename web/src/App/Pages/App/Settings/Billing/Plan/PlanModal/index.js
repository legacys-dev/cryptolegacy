import React from 'react'
import Button from 'App/components/Parts/Button'
import Modal from 'react-modal'
import styles from './styles.css'
import PlanDetail from './PlanDetail'
import plans from './plans'

export default class PlanModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      plans:plans
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.renderPlanList = this.renderPlanList.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  renderPlanList() {
    let plans = this.state.plans.filter(
      (plan, index, arr) => plan.id !== 'free'
    )
    if (this.props.subscriptionData) {
      plans = plans.filter(
        (plan, index, arr) => plan.id !== this.props.subscriptionData.id
        
      )
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
    return (
      <div>
        <Button className={styles.upgradeButton} onClick={this.openModal} primary>
          {!this.props.subscriptionId ? 'Suscribir plan' : 'Actualizar plan'}{' '}
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="">
          <div className={styles.modalContent}>
            {this.renderPlanList()}
            <Button className={styles.closeButtonContainer} onClick={this.closeModal} danger>
              Cerrar
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}
