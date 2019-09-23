import React from 'react'
import styles from './styles.module.css'
import Logo from 'App/components/Parts/Logo'
import MenuOptions from './MenuOptions'
import User from './User'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <User />
      </div>
      <div className={styles.options}>
        <MenuOptions />
      </div>
      <div className={styles.logo}>
        <Logo imgName="white.png" size="40px" />
      </div>
    </div>
  )
}

export default Navbar
