import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const AcceptInvitation = ({ vaultPolicyId, onDeleteSuccess }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('invitations.accept')}
        message={translate('deleteHeritages.deleteHeritageMessage')}
        confirmText={translate('invitations.acceptConfirmMessage')}
        mutation="claimInvitation"
        danger
        params={{ vaultPolicyId }}
        onSuccess={() => onDeleteSuccess()}>
        <div className={styles.delete}>{translate('invitations.accept')}</div>
      </MutationButton>
    </div>
  )
}

export default AcceptInvitation
