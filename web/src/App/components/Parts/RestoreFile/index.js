import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {MdRestorePage} from 'react-icons/md'

const DeleteFile = ({fileId, vaultId, onRestoreSuccess}) => {
  return (
    <div className={styles.container}>
      <Tooltip content="Restaurar archivo" place="top">
        <MutationButton
          title="Restaurar"
          message="¿Confirmas que quieres restaurar este archivo?"
          confirmText="Restaurar"
          mutation="restoreFile"
          primary
          params={{fileId, vaultId}}
          onSuccess={() => onRestoreSuccess(new Date())}>
          <MdRestorePage className={styles.icon} size={25} />
        </MutationButton>
      </Tooltip>
    </div>
  )
}

export default DeleteFile
