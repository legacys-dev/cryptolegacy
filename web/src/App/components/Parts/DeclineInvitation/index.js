import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const DeclineInvitation = ({ vaultPolicyId, accessToken, onDeclineSuccess }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('invitations.decline')}
        message={translate('invitations.declineConfirmText')}
        confirmText={translate('invitations.decline')}
        mutation="declineInvitation"
        danger
        params={{ vaultPolicyId, accessToken }}
        onSuccess={() => onDeclineSuccess()}>
        <div className={styles.decline}>{translate('invitations.decline')}</div>
      </MutationButton>
    </div>
  )
}

export default DeclineInvitation
