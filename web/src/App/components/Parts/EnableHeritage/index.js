import React from 'react'
import styles from './styles.css'
import MutationButton from 'App/components/MutationButton'

export default function EnableHeritage(props) {
  return (
    <div className={styles.container}>
      <MutationButton
        title="Habilitar herencia"
        message="¿Confirmas que quieres habilitar esta herencia?"
        confirmText="Habilitar"
        mutation="releaseHeritage"
        danger
        params={{vaultPolicyId: props.vaultPolicyId}}
        onSuccess={() => props.onEnableSuccess()}>
        <div className={styles.enable}>Habilitar</div>
      </MutationButton>
    </div>
  )
}
