import React from 'react'
import styles from './styles.module.css'
import {PDFViewer, Document} from '@react-pdf/renderer'
import Resume from './Resume'
import translate from 'App/i18n/translate'
const KeyPdfGenerator = ({userData}) => {
  return (
    <div className={styles.container}>
      <PDFViewer className={styles.viewer}>
        <Document
          author="CryptoLegacy"
          keywords="Secret"
          subject={translate('emergencyKit.subjectSecretKit')}
          title={translate('emergencyKit.titleSecretKit')}>
          <Resume userData={userData} />
        </Document>
      </PDFViewer>
    </div>
  )
}
export default KeyPdfGenerator
