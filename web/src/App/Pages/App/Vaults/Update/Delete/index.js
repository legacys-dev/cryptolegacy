import React from 'react'
import MutationButton from 'App/components/MutationButton'

export default function Delete(props) {
  return (
    <MutationButton
      label="Eliminar"
      title="Eliminar"
      message="¿Confirmas que quieres eliminar esta bóveda?"
      confirmText="Eliminar"
      mutation="deletePersonalVault"
      danger
      params={{personalVaultId: props.personalVaultId}}
      onSuccess={() => props.onDeleteSuccess()}
    />
  )
}
