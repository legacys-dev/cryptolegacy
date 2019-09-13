import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const DeclineInvitation = ({ vaultPolicyId, onDeleteSuccess }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('app.delete')}
        message={translate('invitations.decline')}
        confirmText={translate('app.declineConfirmText')}
        mutation="declineInvitation"
        danger
        params={{ vaultPolicyId }}
        onSuccess={() => onDeleteSuccess()}>
        <div className={styles.delete}>{translate('invitations.decline')}</div>
      </MutationButton>
    </div>
  )
}

export default DeclineInvitation
