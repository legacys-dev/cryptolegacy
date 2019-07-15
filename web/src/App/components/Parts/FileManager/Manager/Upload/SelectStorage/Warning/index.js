import React from 'react'
import getEnv from 'App/Root/getEnv'
import styles from './styles.css'
import typeMessages from './typeMessages'

export default class Warning extends React.Component {
  static propTypes = {}

  render() {
    const envType = getEnv()
    return (
      <div className={styles.message}>
        <strong style={{color: 'red'}}>Advertencia</strong>: {typeMessages[envType]}
      </div>
    )
  }
}
