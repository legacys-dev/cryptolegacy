import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Container from 'orionsoft-parts/lib/components/Container'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Button from 'App/components/Parts/Button'
import gql from 'graphql-tag'

@withGraphQL(gql`
  query vault($vaultId: ID) {
    vault(vaultId: $vaultId) {
      _id
      name
      useAsDefault
    }
  }
`)
@withMessage
export default class Vault extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    vault: PropTypes.object
  }

  render() {
    const {vault} = this.props
    const {name, useAsDefault} = vault
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{'/admin/vaults': 'Bóvedas'}}>{vault.name}</Breadcrumbs>
        <Container>
          <Section top title="Editar bóveda" description="Edita una bóveda">
            <AutoForm
              mutation="updateVault"
              ref="form"
              doc={{vaultId: vault._id, name, useAsDefault}}
              omit="vaultId"
              onSuccess={user => this.props.showMessage('Bóveda guardada correctamente')}
            />
            <br />
            <Button primary fullWidth onClick={() => this.refs.form.submit()}>
              Guardar
            </Button>
          </Section>
        </Container>
      </div>
    )
  }
}
