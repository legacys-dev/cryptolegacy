import React from 'react'
import styles from './styles.css'
import getEnv from 'App/Root/getEnv'
import Tooltip from 'orionsoft-parts/lib/components/Tooltip'
import typeMessages from './typeMessages'

const types = {
  beta: 'BETA mode',
  dev: 'DEV mode',
  local: 'Local mode'
}

export default class AppTypeMesssage extends React.Component {
  static propTypes = {}

  state = {}

  getTooltipMessage(type) {
    return <div className={styles.message}>{typeMessages[type]}</div>
  }

  render() {
    const type = getEnv()
    return (
      <div className={styles.container}>
        <Tooltip content={this.getTooltipMessage(type)}>{types[type]}</Tooltip>
      </div>
    )
  }
}
