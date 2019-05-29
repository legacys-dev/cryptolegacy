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
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'
import Delete from './Delete'

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
export default class Update extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    vault: PropTypes.object
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

  renderHeritageOptions() {
    const {vault, history} = this.props
    return (
      <div className={styles.heritageButton}>
        <Button onClick={() => history.push(`/vaults/heritages/${vault._id}`)}>Herencias</Button>
      </div>
    )
  }

  renderButtons() {
    const {vault, history} = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => history.push('/vaults')}>Volver</Button>
        <Delete vaultId={vault._id} onDeleteSuccess={this.onDeleteSuccess} />
        <Button primary onClick={() => this.refs.form.submit()}>
          Actualizar bóveda
        </Button>
      </div>
    )
  }

  render() {
    const {vault} = this.props
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{[`/vaults`]: 'Bóvedas'}} right={this.renderHeritageOptions()}>
          Actualizar bóveda ({vault.name})
        </Breadcrumbs>
        <div className={styles.content}>
          <Section top title="Actualizar bóveda" description="description">
            <AutoForm
              mutation="updateVault"
              omit="vaultId"
              ref="form"
              doc={{vaultId: vault._id, name: vault.name}}
              onSuccess={this.onSuccess}
            />
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
