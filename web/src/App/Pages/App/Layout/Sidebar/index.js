import React from 'react'
import styles from './styles.css'
import User from './User'
import MenuOptions from './MenuOptions'
import Storage from 'App/components/User/Storage'

export default class Navbar extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.user}>
          <User />
        </div>
        <div className={styles.options}>
          <MenuOptions />
        </div>
        <div className={styles.middle} />
        <div className={styles.storage}>
          <Storage />
        </div>
      </div>
    )
  }
}
