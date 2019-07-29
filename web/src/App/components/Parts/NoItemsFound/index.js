import React from 'react'
import styles from './styles.module.css'
import {Alert} from 'App/components/Parts/Icons'
import translate from 'App/i18n/translate'

const NoItemsFound = ({message}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Alert active size={30} />
      </div>
      <div className={styles.message}>
        {translate(message)}
      </div>
    </div>
  )
}

export default NoItemsFound
