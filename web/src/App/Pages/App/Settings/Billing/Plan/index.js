import React from 'react'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'

const Plan = ({planData}) => {
  return (
    <div>
      {planData ? (
        <div>Hay datos</div>
      ) : (
        <div className={styles.noData}>
          <Button>Añade un plan </Button>
        </div>
      )}
    </div>
  )
}

export default Plan
