import React from 'react'
import styles from './styles.module.css'
import {Alert} from 'App/components/Parts/Icons'
import translate from 'App/i18n/translate'

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Alert size={60} />
      </div>
      <div className={styles.title}>{translate('emergency.createAccountSuccess')}</div>
      <div className={styles.danger} dangerouslySetInnerHTML={{__html: translate('emergency.masterKeyMessage')}}/>
      <div className={styles.downloadTip}>
        {translate('emergency.downloadInformation')}
      </div>
    </div>
  )
}

export default Header
