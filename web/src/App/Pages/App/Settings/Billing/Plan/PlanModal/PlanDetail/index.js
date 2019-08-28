import React from 'react'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'

const PlanDetail = ({title, size, seatsPrice, vaultsNum, integration, onGetPlan}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> {title}</h1>
      <div > {size}</div>
      <div> {seatsPrice}</div>
      <div> {vaultsNum}</div>
      <div> {integration}</div>
      <Button onClick={onGetPlan} className={styles.upgradeButton}> Actualizar </Button>
    </div>
  )
}

export default PlanDetail
