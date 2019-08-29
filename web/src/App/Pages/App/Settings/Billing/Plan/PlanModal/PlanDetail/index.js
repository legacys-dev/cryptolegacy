import React from 'react'
import styles from './styles.css'
import MutationButton from 'App/components/MutationButton'
import Button from 'App/components/Parts/Button'

const PlanDetail = ({id, title, size, seatsPrice, vaultsNum, integration, update}) => {
  console.log('detail-update ', id)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {title}</h1>
      <div>
        <div className={styles.size}> {size}</div>
        <div className={styles.seatsPrice}> {seatsPrice}</div>
        <div className={styles.vaultsNum}> {vaultsNum}</div>
        <div className={styles.integration}> {integration}</div>
        </div>
      <MutationButton
        title={!update ? 'Suscribir plan' : 'Actualizar plan'}
        message={`Está seguro de actualizar su plan a ${title}`}
        confirmText={!update ? 'Suscribir plan' : 'Actualizar plan'}
        mutation={!update ? 'getPlan' : 'updatePlan'}
        params={{planId: id}}
        onSuccess={() => console.log('He actualizado el plan!')}
        >
          <Button className={styles.upgradeButton} primary>{!update ? 'Suscribir plan' : 'Actualizar plan'}</Button>
        </MutationButton>
    </div>
  )
}

export default PlanDetail
