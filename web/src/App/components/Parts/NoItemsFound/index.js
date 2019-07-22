import React from 'react'
import styles from './styles.module.css'
import Translate from 'App/i18n'
import {Alert} from 'App/components/Parts/Icons'

const NoItemsFound = ({message}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Alert active size={30} />
      </div>
      <div className={styles.message}>
        <Translate tr={message} />
      </div>
    </div>
  )
}

export default NoItemsFound
