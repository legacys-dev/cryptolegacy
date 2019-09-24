import React from 'react'
import styles from './styles.module.css'
import EmergencyKit from './EmergencyKit'
import Password from './Password'

const Security = () => {
  return (
    <div className={styles.container}>
      <Password />
      <EmergencyKit />
    </div>
  )
}

export default Security
