import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import SixDigitInput from 'App/components/fields/SixDigitInput'
import { Form, Field } from 'simple-react-form'
import autobind from 'autobind-decorator'
import translate from 'App/i18n/translate'
import gql from 'graphql-tag'

@withMutation(gql`
  mutation generateTwoFactorSecret {
    result: generateTwoFactorSecret {
      base32
      qrCode
    }
  }
`)
@withMutation(gql`
  mutation activateTwoFactor($code: String) {
    activateTwoFactor(code: $code) {
      _id
      hasTwoFactor
    }
  }
`)
@withMessage
export default class Enable extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    generateTwoFactorSecret: PropTypes.func,
    activateTwoFactor: PropTypes.func
  }

  state = {}

  @autobind
  async generate() {
    try {
      const { result } = await this.props.generateTwoFactorSecret()
      this.props.showMessage(translate('settings.twoFactorNowYouMustConfirm'))
      this.setState(result)
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  @autobind
  async activate() {
    try {
      await this.props.activateTwoFactor({ code: this.state.code })
      this.props.showMessage(translate('settings.twoFactorEnabled'))
    } catch (error) {
      this.props.showMessage(error)
    }
  }

  renderGenerate() {
    if (this.state.base32) return
    return (
      <div>
        <div>{translate('settings.enableTwoFactor')}</div>
        <br />
        <Button onClick={this.generate} primary>
          {translate('global.start')}
        </Button>
      </div>
    )
  }

  renderActivate() {
    if (!this.state.base32) return
    return (
      <div>
        <p className={styles.instructionStep}>{translate('settings.twoFactorStep1')}</p>
        <div>
          <a
            href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=es"
            target="_blank"
            rel="noopener noreferrer">
            <img
              className={styles.googleIcon}
              src="https://static.weeshing.com/e0f62e7f-338b-482b-b593-492e67ba0775.png"
              alt="Play store"
            />
          </a>
          <a
            href="https://itunes.apple.com/app/authy/id494168017"
            target="_blank"
            rel="noopener noreferrer">
            <img
              className={styles.appStoreIcon}
              src="https://static.weeshing.com/467c9cae-0a30-424c-b33c-683b079dd90e.png"
              alt="AppStore"
            />
          </a>
        </div>
        <p className={styles.instructionStep}>{translate('settings.twoFactorStep2')}</p>
        <div style={{ width: 250 }} dangerouslySetInnerHTML={{ __html: this.state.qrCode }} />
        <p className={styles.addManually}>
          {translate('settings.twoFactorOrManuallyAddTheCode')}
          <code className={styles.addManuallyPre}>{this.state.base32}</code>
        </p>
        <br />
        <p className={styles.instructionStep}>{translate('settings.twoFactorStep3')}</p>
        <Form state={this.state} onChange={changes => this.setState(changes)}>
          <Field fieldName="code" type={SixDigitInput} />
        </Form>
        <br />
        <Button onClick={this.activate}>{translate('global.confirm')}</Button>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderGenerate()}
        {this.renderActivate()}
      </div>
    )
  }
}
