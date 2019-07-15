import React from 'react'
import styles from './styles.module.css'
import MutationButton from 'App/components/MutationButton'

const EnableHeritage = ({vaultPolicyId, onEnableSuccess}) => {
  return (
    <div className={styles.container}>
      <MutationButton
        title="Habilitar herencia"
        message="¿Confirmas que quieres habilitar esta herencia?"
        confirmText="Habilitar"
        mutation="releaseHeritage"
        danger
        params={{vaultPolicyId: vaultPolicyId}}
        onSuccess={() => onEnableSuccess()}>
        <div className={styles.enable}>Habilitar</div>
      </MutationButton>
    </div>
  )
}

export default EnableHeritage
