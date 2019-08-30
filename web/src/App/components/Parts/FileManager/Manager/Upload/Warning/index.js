import React from 'react'
import getEnv from 'App/Root/getEnv'
import styles from './styles.module.css'
import typeMessages from './typeMessages'
import translate from 'App/i18n/translate'

const Warning = () => {
  const envType = getEnv()
  return (
    <div className={styles.message}>
      <strong style={{ color: 'red' }}>{translate('fileManager.warning')}</strong>:{' '}
      {typeMessages[envType]}
    </div>
  )
}

export default Warning
