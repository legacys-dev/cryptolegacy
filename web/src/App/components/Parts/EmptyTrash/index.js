import React from 'react'
import styles from './styles.css'
import MutationButton from 'App/components/MutationButton'

export default function DeleteFile(props) {
  return (
    <div className={styles.container}>
      <MutationButton
        label="Eliminar archivos"
        title="Eliminar archivos"
        message="¿Confirmas que quieres eliminar todos los archivos de esta sección?"
        confirmText="Eliminar"
        mutation="emptyTrash"
        danger
        params={{userId: props.userId}}
        onSuccess={() => props.onDeleteSuccess()}
      />
    </div>
  )
}
