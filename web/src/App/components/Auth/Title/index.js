import React from 'react'
import styles from './styles.module.css'
import translate from 'App/i18n/translate'

const Title = ({text}) => {
  return (
    <div className={styles.container}>
      {translate(text)}
    </div>
  )
}

export default Title
