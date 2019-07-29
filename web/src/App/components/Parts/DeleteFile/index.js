import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {MdDelete} from 'react-icons/md'
import translate from 'App/i18n/translate'

const DeleteFile = ({fileId, vaultId, onDeleteSuccess}) => {
  return (
    <div className={styles.container}>
      <Tooltip content={translate('deleteFile.deleteFile')} place="top">
        <MutationButton
          title={translate('deleteFile.delete')}
          message={translate('deleteFile.deleteFileMessage')}
          confirmText={translate('deleteFile.delete')}
          mutation="deleteFile"
          danger
          params={{fileId, vaultId}}
          onSuccess={() => onDeleteSuccess()}>
          <MdDelete className={styles.icon} size={25} />
        </MutationButton>
      </Tooltip>
    </div>
  )
}

export default DeleteFile
