import React from 'react'
import styles from './styles.module.css'
import getEnv from 'App/Root/getEnv'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import typeMessages from './typeMessages'

const types = {
  beta: 'BETA mode',
  dev: 'DEV mode',
  local: 'Local mode'
}

export default function AppTypeMesssage() {
  const getTooltipMessage = type => {
    return <div className={styles.message}>{typeMessages[type]}</div>
  }

  const environment = getEnv()
  return (
    <div className={styles.container}>
      <Tooltip content={getTooltipMessage(environment)}>{types[environment]}</Tooltip>
    </div>
  )
}
