import React from 'react'
import styles from './styles.css'
import Translate from 'App/i18n'
import {Alert} from 'App/components/Parts/Icons'

export default class NoItemsFound extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <Alert active size={50} />
        </div>
        <div className={styles.message}>
          <Translate tr="vaults.notFound" />
        </div>
      </div>
    )
  }
}
