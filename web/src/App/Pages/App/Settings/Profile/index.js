import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Section from 'App/components/Section'
import Button from 'App/components/Parts/Button'
import AutoForm from 'App/components/AutoForm'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import translate from 'App/i18n/translate'
import Loading from 'App/components/Parts/Loading'
import gql from 'graphql-tag'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import privateDecrypt from 'App/helpers/crypto/privateDecrypt'

@withGraphQL(
  gql`
    query getMyProfile {
      me {
        _id
        profile {
          name
          firstName
          lastName
        }
      }
      getEmergencyKit
    }
  `,
  {loading: <Loading />}
)
@withMessage
export default class Profile extends React.Component {
  static propTypes = {
    me: PropTypes.object,
    getEmergencyKit: PropTypes.object,
    showMessage: PropTypes.func
  }

  state = {isKey: false, masterKey: '***************************'}

  decryptKey = data => {
    const messages = JSON.parse(window.localStorage.getItem('messages'))
    const decryptedKey = privateDecrypt({toDecrypt: data, privateKey: messages.privateKey})
    this.setState({masterKey: decryptedKey.userMasterKey.original, isKey: true})
  }

  setKey = key => {
    if (this.state.isKey) {
      this.setState({masterKey: '***************************', isKey: false})
    } else {
      this.decryptKey(key)
    }
  }

  getPdf(data) {
    function saveByteArray(reportName, byte) {
      const blob = new Blob([byte], {type: 'application/pdf'})
      const link = document.createElement('a')
      const fileName = reportName
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
    }
    const buff = Buffer.from(data, 'hex')
    saveByteArray('secretKey', buff)
  }

  render() {
    if (!this.props.me) return
    const profile = {
      userId: this.props.me._id,
      firstName: this.props.me.profile.firstName,
      lastName: this.props.me.profile.lastName
      //      profile: this.props.me.profile
    }
    return (
      <div className={styles.container}>
        <Section
          top
          title={translate('settings.profile')}
          description={translate('settings.profileDescription')}>
          <AutoForm
            mutation="setUserProfile"
            doc={profile}
            onSuccess={() => this.props.showMessage(translate('settings.yourProfileWasSaved'))}
            ref="form">
            <Field
              label={translate('settings.firstName')}
              fieldName="firstName"
              type={Text}
              fieldtype="firstName"
            />
            <Field
              label={translate('settings.lastName')}
              fieldName="lastName"
              type={Text}
              fieldtype="lastName"
            />
          </AutoForm>
          <br />
          <Button onClick={() => this.refs.form.submit()} primary>
            {translate('global.save')}
          </Button>
        </Section>
        <div className={styles.divider} />
        <Section title={'Master Key'} description={translate('settings.downloadMasterKey')}>
          <div className={styles.secretKey}>
            <span className={styles.title}>{translate('settings.masterKey')} </span>
            <span>{this.state.masterKey}</span>
            <a onClick={() => this.setKey(this.props.getEmergencyKit.key)}>
              {this.state.isKey ? translate('settings.hide') : translate('settings.show')}
            </a>
          </div>
          <Button onClick={() => this.getPdf(this.props.getEmergencyKit.data)} primary>
            {translate('settings.downloadKey')}
          </Button>
        </Section>
      </div>
    )
  }
}
