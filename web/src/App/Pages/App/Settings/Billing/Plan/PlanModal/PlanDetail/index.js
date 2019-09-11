import React from 'react'
import styles from './styles.css'
import MutationButton from 'App/components/MutationButton'
import Button from 'App/components/Parts/Button'

const PlanDetail = ({ id, title, size, seatsPrice, vaultsNum, integration, update }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {title}</h1>
      <div className={styles.details}>
        <div className={styles.categories}><strong>Capacidad máxima</strong></div>
        <div className={styles.data}> {size}</div>
        <div className={styles.categories}><strong>Valor de asiento</strong></div>
        <div className={styles.data}> {seatsPrice}</div>
        <div className={styles.categories}><strong>Cantidad máxima de bóvedas</strong></div>
        <div className={styles.data}> {vaultsNum}</div>
        <div className={styles.categories}><strong>Google Drive</strong></div>
        <div className={styles.data}>{integration}</div>
      </div>
      <MutationButton
        title={!update ? 'Suscribir plan' : 'Actualizar plan'}
        message={`Está seguro de actualizar su plan a ${title}`}
        confirmText={!update ? 'Suscribir plan' : 'Actualizar plan'}
        mutation={!update ? 'getPlan' : 'updatePlan'}
        params={{ planId: id }}
        onSuccess={() => console.log('He actualizado el plan!')}>
        <Button className={styles.upgradeButton} primary>
          {!update ? 'Suscribir plan' : 'Actualizar plan'}
        </Button>
      </MutationButton>
    </div>
  )
}

export default PlanDetail
