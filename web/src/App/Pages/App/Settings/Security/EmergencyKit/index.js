import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import Section from 'App/components/Section'
import translate from 'App/i18n/translate'
import Button from 'App/components/Parts/Button'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Loading from 'App/components/Parts/Loading'
import KeyPdfGenerator from 'App/functions/KeyPdfGenerator'
import { getMessagePrivateKey } from 'App/helpers/user'
import { Document } from '@react-pdf/renderer'
import Resume from 'App/functions/KeyPdfGenerator/Resume'


@withGraphQL(
  gql`
    query myEmergencyKit {
      getEmergencyKit
    }
  `,
  { loading: <Loading /> }
)
export default class EmergencyKit extends React.Component {
  static propTypes = {
    getEmergencyKit: PropTypes.object
  }

  state = { masterKey: '••••••••••••••••••••••••••••••••', showingKey: false, decryptContent: null }

  decryptKey(data) {
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decriptedData = privateDecrypt({ toDecrypt: data, privateKey: messages.privateKey })
    this.setState({ masterKey: decriptedData.userMasterKey.original, showingKey: true })
  }

  setKey(key) {
    if (this.state.showingKey) {
      this.setState({ masterKey: '••••••••••••••••••••••••••••••••', showingKey: false })
    } else {
      this.decryptKey(key)
    }
  }

  renderDoc = () => {
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decryptedData = privateDecrypt({
      toDecrypt: this.props.getEmergencyKit.encryptedUserData,
      privateKey: messages.privateKey
    })
    const { userName, userLastName, createdAt } = decryptedData
    const decryptedMasterKey = privateDecrypt({
      toDecrypt: this.props.getEmergencyKit.userMasterKey,
      privateKey: messages.privateKey
    })

    
    const userData = {
      userName,
      userLastName,
      createdAt,
      userMasterKey: decryptedMasterKey.userMasterKey.original
    }
    return (
      <Document
        author="CryptoLegacy"
        keywords="Secret"
        subject={translate('emergencyKit.subjectSecretKit')}
        title={translate('emergencyKit.titleSecretKit')}>
        <Resume userData={userData} />
      </Document>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <Section title={'Master Key'} description={translate('settings.downloadMasterKey')}>
          <div className={styles.secretKey}>
            <span className={styles.title}>{translate('settings.masterKey')} </span>
            <span>{this.state.masterKey}</span>
            <a
              className={styles.show}
              onClick={() => this.setKey(this.props.getEmergencyKit.userMasterKey)}>
              {this.state.showingKey ? translate('settings.hide') : translate('settings.show')}
            </a>
          </div>
          <div className={styles.button}>
            <Button primary>
              <PDFDownloadLink document={this.renderDoc()} fileName="somename.pdf" className={styles.downloadButton}>
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : `${translate('settings.downloadKey')}`
                }
              </PDFDownloadLink>
            </Button>
          </div>
        </Section>
      </div>
    )
  }
}
