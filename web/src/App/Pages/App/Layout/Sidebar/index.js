import React from 'react'
import styles from './styles.module.css'
import User from './User'
import MenuOptions from './MenuOptions'
import Logo from 'App/components/Parts/Logo'
import translate from 'App/i18n/translate'

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
        <p>{translate('sidebar.termsAndConditions')}</p>
      </div>
    </div>
  )
}

export default Navbar
