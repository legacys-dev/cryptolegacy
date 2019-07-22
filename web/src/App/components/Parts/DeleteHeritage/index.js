import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'

const DeleteFile = ({vaultPolicyId, vaultId, onDeleteSuccess}) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title="Eliminar"
        message="¿Confirmas que quieres eliminar esta herencia?"
        confirmText="Eliminar"
        mutation="deleteHeritage"
        danger
        params={{vaultPolicyId, vaultId}}
        onSuccess={() => onDeleteSuccess()}>
        <div className={styles.delete}>Eliminar</div>
      </MutationButton>
    </div>
  )
}

export default DeleteFile
