import React, { useState } from 'react'
import styles from './styles.module.css'
import Section from 'App/components/Section'
import translate from 'App/i18n/translate'
import Button from 'App/components/Parts/Button'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'
import useQuery from 'apollo-hooks/lib/useQuery'
import gql from 'graphql-tag'

const EmergencyKit = () => {
  const [masterKey, setMasterKey] = useState('••••••••••••••••••••••••••••••••')
  const [showingKey, setShowingKey] = useState(false)

  const { getEmergencyKit } = useQuery(
    gql`
      query myEmergencyKit {
        getEmergencyKit
      }
    `
  )

  const decryptKey = data => {
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decryptedKey = privateDecrypt({ toDecrypt: data, privateKey: messages.privateKey })
    setMasterKey(decryptedKey.userMasterKey.original)
    setShowingKey(true)
  }

  const setKey = key => {
    if (showingKey) {
      setMasterKey('••••••••••••••••••••••••••••••••')
      setShowingKey(false)
    } else {
      decryptKey(key)
    }
  }

  const saveByteArray = (reportName, byte) => {
    const blob = new Blob([byte], { type: 'application/pdf' })
    const link = document.createElement('a')
    const fileName = reportName
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }

  const getPdf = data => {
    const buff = Buffer.from(data, 'hex')
    saveByteArray('secretKey', buff)
  }

  return (
    <div className={styles.container}>
      <Section title={'Master Key'} description={translate('settings.downloadMasterKey')}>
        <div className={styles.secretKey}>
          <span className={styles.title}>{translate('settings.masterKey')} </span>
          <span>{masterKey}</span>
          <a className={styles.show} onClick={() => setKey(getEmergencyKit.key)}>
            {showingKey ? translate('settings.hide') : translate('settings.show')}
          </a>
        </div>
        <div className={styles.button}>
          <Button onClick={() => getPdf(getEmergencyKit.data)} primary>
            {translate('settings.downloadKey')}
          </Button>
        </div>
      </Section>
    </div>
  )
}

export default EmergencyKit
