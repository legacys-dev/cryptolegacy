import React from 'react'
import styles from './styles.module.css'
import Translate from 'App/i18n'

export default function Title({text}) {
  return (
    <div className={styles.container}>
      <Translate tr={text} />
    </div>
  )
}
