import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import Section from 'App/components/Section'
import translate from 'App/i18n/translate'
import Button from 'App/components/Parts/Button'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'

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

  state = { masterKey: '••••••••••••••••••••••••••••••••', showingKey: false }

  decryptKey(data) {
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decryptedKey = privateDecrypt({ toDecrypt: data, privateKey: messages.privateKey })
    this.setState({ masterKey: decryptedKey.userMasterKey.original, showingKey: true })
  }

  setKey(key) {
    if (this.state.showingKey) {
      this.setState({ masterKey: '••••••••••••••••••••••••••••••••', showingKey: false })
    } else {
      this.decryptKey(key)
    }
  }

  saveByteArray(reportName, byte) {
    const blob = new Blob([byte], { type: 'application/pdf' })
    const link = document.createElement('a')
    const fileName = reportName
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }

  getPdf(data) {
    const buff = Buffer.from(data, 'hex')
    this.saveByteArray('secretKey', buff)
  }

  render() {
    return (
      <div className={styles.container}>
        <Section title={'Master Key'} description={translate('settings.downloadMasterKey')}>
          <div className={styles.secretKey}>
            <span className={styles.title}>{translate('settings.masterKey')} </span>
            <span>{this.state.masterKey}</span>
            <a className={styles.show} onClick={() => this.setKey(this.props.getEmergencyKit.key)}>
              {this.state.showingKey ? translate('settings.hide') : translate('settings.show')}
            </a>
          </div>
          <div className={styles.button}>
            <Button onClick={() => this.getPdf(this.props.getEmergencyKit.data)} primary>
              {translate('settings.downloadKey')}
            </Button>
          </div>
        </Section>
      </div>
    )
  }
}
