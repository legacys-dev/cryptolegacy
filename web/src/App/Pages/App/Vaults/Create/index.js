import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Breadcrumbs from 'App/components/Breadcrumbs'
import AutoForm from 'App/components/AutoForm'
import {withRouter} from 'react-router'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import autobind from 'autobind-decorator'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'

@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object
  }

  @autobind
  onSuccess() {
    const {showMessage, history} = this.props
    showMessage('Bóveda creada correctamente')
    history.push('/vaults')
  }

  renderButtons() {
    return (
      <div className={styles.buttons}>
        <Button onClick={() => this.props.history.push('/vaults')}>Volver</Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          Crear bóveda
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{[`/vaults`]: 'Bóvedas'}}>Crear bóveda</Breadcrumbs>
        <div className={styles.content}>
          <Section top title="Crear bóveda" description="description">
            <AutoForm mutation="createPersonalVault" ref="form" onSuccess={this.onSuccess} />
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
