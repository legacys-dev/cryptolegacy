import React from 'react'
import Button from 'App/components/Parts/Button'
import Modal from 'react-modal'
import styles from './styles.css'
import PlanDetail from './PlanDetail'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import plans from './plans'

@withMutation(gql`
  mutation getPlan($planId: String) {
    session: getPlan(planId: $planId)
  }
`)
export default class PlanModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      plans: plans
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getPlanAction = this.getPlanAction.bind(this)
  }

  static propTypes = {
    getPlan: PropTypes.object
  }

  async getPlanAction(planId) {
    try {
      this.props.getPlan({planId})
      this.closeModal()
    } catch (error) {
      console.log('Error:', error)
    }
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  renderPlanList() {
    return (
      <div className={styles.planListContainer}>
        {this.state.plans.map((planData, index) => (
          <PlanDetail key={'planDetail-' + index} {...planData} onGetPlan={this.getPlanAction(planData.id)} />
        ))}
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
        <Button className={styles.upgradeButton} onClick={this.openModal}> Actualiza tu plan </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="">
          <div className={styles.modalContent}>
            {this.renderPlanList()}
            <Button className={styles.closeButtonContainer} onClick={this.closeModal}>Cerrar</Button>
          </div>
        </Modal>
      </div>
    )
  }
}
