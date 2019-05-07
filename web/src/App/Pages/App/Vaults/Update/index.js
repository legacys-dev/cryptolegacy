import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import AutoForm from 'App/components/AutoForm'
import autobind from 'autobind-decorator'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'
import gql from 'graphql-tag'
import Delete from './Delete'

@withGraphQL(gql`
  query personalVault($personalVaultId: ID) {
    personalVault(personalVaultId: $personalVaultId) {
      _id
      name
    }
  }
`)
@withRouter
@withMessage
export default class Update extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    personalVault: PropTypes.object
  }

  @autobind
  onSuccess() {
    const {showMessage} = this.props
    showMessage('Bóveda actualizada correctamente')
  }

  @autobind
  onDeleteSuccess() {
    const {showMessage, history} = this.props
    showMessage('Bóveda eliminada correctamente')
    history.push('/vaults')
  }

  renderButtons() {
    const {personalVault} = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => this.props.history.push('/vaults')}>Volver</Button>
        <Delete personalVaultId={personalVault._id} onDeleteSuccess={this.onDeleteSuccess} />
        <Button primary onClick={() => this.refs.form.submit()}>
          Actualizar bóveda
        </Button>
      </div>
    )
  }

  render() {
    const {personalVault} = this.props
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{[`/vaults`]: 'Bóvedas'}}>Actualizar bóveda</Breadcrumbs>
        <div className={styles.content}>
          <Section top title="Actualizar bóveda" description="description">
            <AutoForm
              mutation="updatePersonalVault"
              omit="personalVaultId"
              ref="form"
              doc={{personalVaultId: personalVault._id, name: personalVault.name}}
              onSuccess={this.onSuccess}
            />
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
