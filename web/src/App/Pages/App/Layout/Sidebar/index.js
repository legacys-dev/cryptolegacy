import React from 'react'
import styles from './styles.module.css'
import User from './User'
import MenuOptions from './MenuOptions'
import Storage from 'App/components/User/Storage'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <User />
      </div>
      <div className={styles.options}>
        <MenuOptions />
      </div>
      <div className={styles.storage}>
        <Storage />
      </div>
    </div>
  )
}

export default Navbar
