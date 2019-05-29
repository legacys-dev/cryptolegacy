import React from 'react'
import MutationButton from 'App/components/MutationButton'

export default function Delete(props) {
  return (
    <MutationButton
      label="Eliminar"
      title="Eliminar"
      message="¿Confirmas que quieres eliminar esta bóveda?"
      confirmText="Eliminar"
      mutation="deleteVault"
      danger
      params={{vaultId: props.vaultId}}
      onSuccess={() => props.onDeleteSuccess()}
    />
  )
}
