import React from 'react'
import styles from './styles.css'
import getEnv from 'App/Root/getEnv'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import typeMessages from './typeMessages'

const types = {
  beta: 'BETA mode',
  dev: 'DEV mode',
  local: 'BETA mode'
}

export default class AppTypeMesssage extends React.Component {
  static propTypes = {}

  state = {}

  getMessage(type) {
    return <div className={styles.message}>{typeMessages[type]}</div>
  }

  renderLocalMode() {
    return <div className={styles.container}>LOCAL mode</div>
  }

  render() {
    const type = getEnv()
    if (type === 'local') return this.renderLocalMode()
    return (
      <div className={styles.container}>
        <Tooltip content={this.getMessage(type)}>{types[type]}</Tooltip>
      </div>
    )
  }
}
