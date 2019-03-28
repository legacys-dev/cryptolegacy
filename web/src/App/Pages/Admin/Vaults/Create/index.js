import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Section from 'App/components/Section'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import Button from 'orionsoft-parts/lib/components/Button'
import Container from 'orionsoft-parts/lib/components/Container'
import Breadcrumbs from 'App/components/Breadcrumbs'
import {withRouter} from 'react-router'
import autobind from 'autobind-decorator'

@withMessage
@withRouter
export default class Create extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    showMessage: PropTypes.func
  }

  @autobind
  onSuccess() {
    const {showMessage, history} = this.props
    showMessage('Bóveda creada con éxito')
    history.push(`/admin/vaults`)
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/admin/vaults': 'Bóvedas'}}>Nueva bóveda</Breadcrumbs>
        <Container>
          <Section top title="Crear bóveda" description="Crea una nueva bóveda">
            <AutoForm mutation="createVault" ref="form" onSuccess={this.onSuccess} />
            <br />
            <Button primary fullWidth onClick={() => this.refs.form.submit()}>
              Crear
            </Button>
          </Section>
        </Container>
      </div>
    )
  }
}
