import React from 'react'
import getEnv from 'App/Root/getEnv'
import styles from './styles.module.css'
import typeMessages from './typeMessages'

const Warning = () => {
  const envType = getEnv()
  return (
    <div className={styles.message}>
      <strong style={{color: 'red'}}>Advertencia</strong>: {typeMessages[envType]}
    </div>
  )
}

export default Warning
