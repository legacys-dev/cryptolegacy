import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'

const DeleteFile = ({userId, filesCount, onDeleteSuccess}) => {
  return (
    <div className={styles.container}>
      <MutationButton
        label="Eliminar archivos"
        title="Eliminar archivos"
        message="¿Confirmas que quieres eliminar todos los archivos de esta sección?"
        confirmText="Eliminar"
        mutation="emptyTrash"
        disabled={!filesCount}
        danger
        params={{userId: userId}}
        onSuccess={() => onDeleteSuccess()}
      />
    </div>
  )
}

export default DeleteFile
