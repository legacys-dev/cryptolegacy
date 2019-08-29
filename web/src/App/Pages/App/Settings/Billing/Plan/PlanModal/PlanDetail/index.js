import React from 'react'
import styles from './styles.css'
import MutationButton from 'App/components/MutationButton'

const PlanDetail = ({id, title, size, seatsPrice, vaultsNum, integration, update}) => {
  console.log('detail-update ', id)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {title}</h1>
      <div> {size}</div>
      <div> {seatsPrice}</div>
      <div> {vaultsNum}</div>
      <div> {integration}</div>
      <MutationButton
        className={styles.upgradeButton}
        title={!update ? 'Suscribir plan' : 'Actualizar plan'}
        message={`Está seguro de actualizar su plan a ${title}`}
        confirmText={!update ? 'Suscribir plan' : 'Actualizar plan'}
        mutation={!update ? 'getPlan' : 'updatePlan'}
        params={{planId: id}}
        onSuccess={() => console.log('He actualizado el plan!')}>
        <div className={styles.getPlan}>{!update ? 'Suscribir plan' : 'Actualizar plan'}</div>
      </MutationButton>
    </div>
  )
}

export default PlanDetail
