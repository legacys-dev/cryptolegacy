import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import { withRouter } from 'react-router'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import { getEncryptedPassword } from 'App/helpers/user'
import Loading from 'App/components/Parts/Loading'
import Select from 'App/components/fields/Select'
import Button from 'App/components/Parts/Button'
import Header from 'App/components/Parts/Header'
import Text from 'App/components/fields/Text'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import { Field } from 'simple-react-form'
import options from './options'
import gql from 'graphql-tag'

@withGraphQL(
  gql`
    query getInformation($vaultId: ID) {
      vault(vaultId: $vaultId) {
        _id
        name
      }
      getAvailableSeats
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
    vault: PropTypes.object
  }

  @autobind
  onSuccess() {
    const { showMessage, vault, history } = this.props
    showMessage(translate('vaults.createInvitation'))
    history.push(`/vaults/invitations/${vault._id}`)
  }

  getEncrypted

  renderButtons() {
    const { vault, history } = this.props
    return (
      <div className={styles.buttons}>
        <Button onClick={() => history.push(`/vaults/invitations/${vault._id}`)}>
          {translate('vaults.back')}
        </Button>
        <Button primary onClick={() => this.refs.form.submit()}>
          {translate('vaults.inviteToVault')}
        </Button>
      </div>
    )
  }

  renderSeats() {
    return (
      <div className={styles.seatsContainer}>
        <div className={styles.seats} onClick={() => this.props.history.push('/settings/seats')}>
          {translate('invitations.availableSeats')}
          <div className={styles.number}>{this.props.getAvailableSeats}</div>
        </div>
      </div>
    )
  }

  render() {
    const { vault } = this.props
    return (
      <div className={styles.container}>
        <Header
          past={{
            [`/vaults/invitations/${vault._id}`]: `${translate('vaults.vault')} (${vault.name})`
          }}
          title={translate('vaults.inherit')}
        />
        <div className={styles.content}>
          {this.renderSeats()}
          <AutoForm
            mutation="inviteUser"
            ref="form"
            doc={{ vaultId: vault._id, credentials: getEncryptedPassword() }}
            onSuccess={this.onSuccess}>
            <Field label={translate('invitations.invitedEmail')} fieldName="email" type={Text} />
            <Field
              label={translate('invitations.invitedRole')}
              fieldName="role"
              type={Select}
              options={options}
            />
          </AutoForm>
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}
