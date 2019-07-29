import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const DeleteFile = ({vaultPolicyId, vaultId, onDeleteSuccess}) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title={translate('deleteHeritages.delete')}
        message={translate('deleteHeritages.deleteHeritageMessage')}
        confirmText={translate('deleteHeritages.delete')}
        mutation="deleteHeritage"
        danger
        params={{vaultPolicyId, vaultId}}
        onSuccess={() => onDeleteSuccess()}>
        <div className={styles.delete}>{translate('deleteHeritages.delete')}</div>
      </MutationButton>
    </div>
  )
}

export default DeleteFile
