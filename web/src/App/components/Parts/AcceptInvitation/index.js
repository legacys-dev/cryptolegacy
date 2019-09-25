import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import { getEncryptedPassword } from 'App/helpers/user'
import translate from 'App/i18n/translate'

const AcceptInvitation = ({ vaultPolicyId, onAcceptSuccess, accessToken }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('invitations.accept')}
        message={translate('invitations.acceptConfirmMessage')}
        confirmText={translate('invitations.accept')}
        mutation="claimInvitation"
        danger
        params={{ vaultPolicyId, accessToken, credentials: getEncryptedPassword() }}
        onSuccess={response => onAcceptSuccess(response)}>
        <div className={styles.accept}>{translate('invitations.accept')}</div>
      </MutationButton>
    </div>
  )
}

export default AcceptInvitation
