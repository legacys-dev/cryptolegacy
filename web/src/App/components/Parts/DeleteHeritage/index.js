import React from 'react'
import styles from './styles.css'
import MutationButton from 'App/components/MutationButton'

export default function DeleteFile(props) {
  return (
    <div className={styles.container}>
      <MutationButton
        title="Eliminar"
        message="¿Confirmas que quieres eliminar esta herencia?"
        confirmText="Eliminar"
        mutation="deleteHeritage"
        danger
        params={{vaultPolicyId: props.vaultPolicyId, vaultId: props.vaultId}}
        onSuccess={() => props.onDeleteSuccess()}>
        <div className={styles.delete}>Eliminar</div>
      </MutationButton>
    </div>
  )
}
