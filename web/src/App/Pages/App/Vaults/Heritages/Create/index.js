import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {withRouter} from 'react-router'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import {getEncryptedPassword} from 'App/helpers/user'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Loading from 'App/components/Parts/Loading'
import Button from 'App/components/Parts/Button'
import Section from 'App/components/Section'
import autobind from 'autobind-decorator'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query getVault($vaultId: ID) {
      vault(vaultId: $vaultId) {
        _id
        name
      }
    }
  `,
  {loading: <Loading />}
)
@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    vault: PropTypes.object
  }

  @autobind
  onSuccess() {
    const {showMessage, vault, history} = this.props
    showMessage('Se ha creado una herencia')
    history.push(`/vaults/heritages/${vault._id}`)
  }

  getEncrypted

  renderButtons() {
    const {vault, history} = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => history.push(`/vaults/heritages/${vault._id}`)}>Volver</Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          Heredar bóveda
        </Button>
      </div>
    )
  }

  render() {
    const {vault} = this.props
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{[`/vaults/heritages/${vault._id}`]: `Bóveda (${vault.name})`}}>
          Heredar
        </Breadcrumbs>
        <div className={styles.content}>
          <Section top title="Heredar bóveda" description="description">
            <AutoForm
              mutation="createHeritage"
              omit={['vaultId', 'credentials']}
              ref="form"
              doc={{vaultId: vault._id, credentials: getEncryptedPassword()}}
              onSuccess={this.onSuccess}
            />
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
