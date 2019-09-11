import React from 'react'
import MutationButton from 'App/components/MutationButton'
import translate from 'App/i18n/translate'
export default function Delete(props) {
  return (
    <MutationButton
      label={translate('vaults.delete')}
      title={translate('vaults.delete')}
      message={translate('vaults.deleteMessage')}
      confirmText={translate('vaults.delete')}
      mutation="deleteVault"
      danger
      params={{vaultId: props.vaultId}}
      onSuccess={() => props.onDeleteSuccess()}
    />
  )
}
