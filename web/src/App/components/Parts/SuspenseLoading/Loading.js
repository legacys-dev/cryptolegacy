import React from 'react'
import styles from './styles.module.css'

export default props => {
  const {height} = props || 200
  return <div className={styles.container} style={{height}} />
}
