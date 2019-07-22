import React from 'react'
import styles from './styles.module.css'
import Translate from 'App/i18n'

const Title = ({text}) => {
  return (
    <div className={styles.container}>
      <Translate tr={text} />
    </div>
  )
}

export default Title
