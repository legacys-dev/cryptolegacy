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

@withMessage
@withRouter
export default class Create extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    showMessage: PropTypes.func
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/admin/vaults': 'Bóvedas'}}>Nueva bóveda</Breadcrumbs>
        <Container>
          <Section top title="Crear bóveda" description="Crea una nueva bóveda">
            <AutoForm
              mutation="createVault"
              ref="form"
              onSuccess={company => this.props.history.push(`/admin/vaults/${company._id}`)}
            />
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
