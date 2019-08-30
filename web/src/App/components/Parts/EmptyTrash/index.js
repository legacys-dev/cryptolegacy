import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'

const DeleteFile = ({ userId, filesCount, onDeleteSuccess }) => {
  return (
    <div className={styles.container}>
      <MutationButton
        label={translate('emptyTrash.deleteFiles')}
        title={translate('emptyTrash.deleteFiles')}
        message={translate('emptyTrash.deleteFilesMessage')}
        confirmText={translate('emptyTrash.delete')}
        mutation="emptyTrash"
        disabled={!filesCount}
        danger
        params={{ userId: userId }}
        onSuccess={() => onDeleteSuccess()}
      />
    </div>
  )
}

export default DeleteFile
