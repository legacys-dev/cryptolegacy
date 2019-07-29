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
import translate from 'App/i18n/translate'

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
    showMessage(translate('vaults.vaultUpdatedSuccessfully'))
  }

  @autobind
  onDeleteSuccess() {
    const {showMessage, history} = this.props
    showMessage(translate('vaults.vaultDeletedSuccessfully'))
    history.push('/vaults')
  }

  renderHeritageOptions() {
    const {vault, history} = this.props
    return (
      <div className={styles.heritageButton}>
        <Button onClick={() => history.push(`/vaults/heritages/${vault._id}`)}>{translate('vaults.heritages')}</Button>
      </div>
    )
  }

  renderButtons() {
    const {vault, history} = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => history.push('/vaults')}>{translate('vaults.back')}</Button>
        <Delete vaultId={vault._id} onDeleteSuccess={this.onDeleteSuccess} />
        <Button primary onClick={() => this.refs.form.submit()}>
          {translate('vaults.updateVault')}
        </Button>
      </div>
    )
  }

  render() {
    const {vault} = this.props
    return (
      <div className={styles.container}>
        <Breadcrumbs past={{[`/vaults`]: translate('vaults.vaults')}} right={this.renderHeritageOptions()}>
          {translate('vaults.updateVault')} ({vault.name})
        </Breadcrumbs>
        <div className={styles.content}>
          <Section top title={translate('vaults.updateVault')} description={translate('vaults.description')}>
            <AutoForm
              mutation="updateVault"
              ref="form"
              doc={{vaultId: vault._id, name: vault.name}}
              onSuccess={this.onSuccess}
            >
              <Field 
                label={translate('vaults.vaultName')}
                fieldName="name"
                type={Text}
              />
            </AutoForm>
            {this.renderButtons()}
          </Section>
        </div>
      </div>
    )
  }
}
