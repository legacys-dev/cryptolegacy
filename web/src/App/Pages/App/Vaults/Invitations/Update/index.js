import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { withRouter } from 'react-router'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
// import { getEncryptedPassword } from 'App/helpers/user'
import Loading from 'App/components/Parts/Loading'
import Select from 'App/components/fields/Select'
import Button from 'App/components/Parts/Button'
import Header from 'App/components/Parts/Header'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import { Field } from 'simple-react-form'
import options from './options'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query getInformation($vaultId: ID, $vaultPolicyId: String) {
      vault(vaultId: $vaultId) {
        _id
        name
      }
      vaultPolicy(vaultPolicyId: $vaultPolicyId)
    }
  `,
  { loading: <Loading /> }
)
@withRouter
@withMessage
export default class Create extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    getAvailableSeats: PropTypes.number,
    history: PropTypes.object,
    vault: PropTypes.object,
    vaultPolicy: PropTypes.object
  }

  @autobind
  onSuccess() {
    const { showMessage } = this.props
    showMessage(translate('vaults.updateInvitation'))
  }

  renderButtons() {
    const { vault, history } = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => history.push(`/vaults/invitations/${vault._id}`)}>
          {translate('vaults.back')}
        </Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          {translate('invitations.updateInvitation')}
        </Button>
      </div>
    )
  }

  renderForm() {
    const { vaultPolicy } = this.props
    return (
      <AutoForm
        mutation="updateInvitation"
        ref="form"
        doc={{ vaultPolicyId: vaultPolicy._id, role: vaultPolicy.role }}
        onSuccess={this.onSuccess}>
        <Field
          label={translate('invitations.invitedRole')}
          fieldName="role"
          type={Select}
          options={options}
        />
      </AutoForm>
    )
  }

  renderItem(label, value) {
    return (
      <div className={styles.information}>
        <div className={styles.title}>{label}</div>
        <div className={styles.item}>{value}</div>
      </div>
    )
  }

  renderInformation() {
    const { vaultPolicy } = this.props
    return (
      <div className={styles.info}>
        {this.renderItem('Vault:', vaultPolicy.vaultName)}
        {this.renderItem('User email:', vaultPolicy.userEmail)}
        {this.renderItem('Status', vaultPolicy.status)}
      </div>
    )
  }

  renderHeader() {
    const { vault } = this.props
    return (
      <Header
        past={{
          [`/vaults/invitations/${vault._id}`]: `${translate('vaults.vault')} (${vault.name})`
        }}
        title={translate('vaults.invitations')}
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderHeader()}
        <div className={styles.content}>
          {this.renderInformation()}
          {this.renderForm()}
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}
