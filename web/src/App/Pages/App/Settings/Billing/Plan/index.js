import React from 'react'
import styles from './styles.css'
import PlanModal from './PlanModal'

const Plan = ({planData}) => {
  return (
    <div>
      {planData ? (
        <div>Hay datos</div>
      ) : (
        <div className={styles.noData}>
          <PlanModal/>
        </div>
      )}
    </div>
  )
}

export default Plan
