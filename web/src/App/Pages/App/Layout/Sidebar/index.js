import React from 'react'
import styles from './styles.module.css'
import User from './User'
import MenuOptions from './MenuOptions'
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
        <img src="./logos/white.png" style={{width: '128px', height: '39.56px'}} />
        <p style={{color: 'white', cursor: 'pointer'}}>{translate('sidebar.termsAndConditions')}</p>
      </div>
    </div>
  )
}

export default Navbar
