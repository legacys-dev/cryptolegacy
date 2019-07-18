import React from 'react'
import styles from './styles.module.css'
import {PDFViewer, Document} from '@react-pdf/renderer'
import Resume from './Resume'

const KeyPdfGenerator = ({props}) => {
  return (
    <div className={styles.container}>
      <PDFViewer className={styles.viewer}>
        <Document
          author="CryptoLegacy"
          keywords="Secret"
          subject="This document shown only once"
          title="CryptoLegacy secret user kit">
          <Resume userData={props.userData} />
        </Document>
      </PDFViewer>
    </div>
  )
}
export default KeyPdfGenerator
