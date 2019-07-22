import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import {MdDelete} from 'react-icons/md'

const DeleteFile = ({fileId, vaultId, onDeleteSuccess}) => {
  return (
    <div className={styles.container}>
      <Tooltip content="Eliminar archivo" place="top">
        <MutationButton
          title="Eliminar"
          message="¿Confirmas que quieres eliminar este archivo?"
          confirmText="Eliminar"
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
