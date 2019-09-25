import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const DeleteFile = ({ vaultPolicyId, userId, onDeleteSuccess }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('policies.deleteInvitation')}
        message={translate('policies.deleteInvitationMessage')}
        confirmText={translate('policies.deleteInvitation')}
        mutation="deleteVaultPolicy"
        danger
        params={{ vaultPolicyId, userId }}
        onSuccess={() => onDeleteSuccess()}>
        <div className={styles.delete}>{translate('policies.deleteInvitation')}</div>
      </MutationButton>
    </div>
  )
}

export default DeleteFile
