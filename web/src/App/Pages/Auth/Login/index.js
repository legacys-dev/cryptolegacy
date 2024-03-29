import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import { Field } from 'simple-react-form'
import Button from 'App/components/Parts/Button'
import Title from 'App/components/Auth/Title'
import Text from 'App/components/fields/Text'
import Checkbox from 'orionsoft-parts/lib/components/fields/Checkbox'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import { setUserMessageKeys } from 'App/helpers/messageKeys'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import withUserId from 'App/helpers/auth/withUserId'
import { setSession } from '@orion-js/graphql-client'
import autobind from 'autobind-decorator'
import translate from 'App/i18n/translate'
import LoggedIn from '../LoggedIn'
import { Link } from 'react-router-dom'

@withUserId
@withMessage
export default class Login extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    onLogin: PropTypes.func,
    userId: PropTypes.string,
    loading: PropTypes.bool
  }

  @autobind
  async onSuccess(response) {
    const { session, encryptedKeysForMessages } = response
    await sleep(1000)
    try {
      await setSession(session)

      await setUserMessageKeys(this.state.userMasterKey, encryptedKeysForMessages)
      this.setState({ userMasterKey: undefined })
      this.props.onLogin()
      this.props.showMessage(translate('auth.loginSuccessfully'))
    } catch (error) {
      console.log('Error:', error)
    }
  }

  @autobind
  onChange(data) {
    this.setState({ userMasterKey: data.masterKey })
  }

  renderForgotLink() {
    return (
      <div className={styles.forgotLink}>
        <Link to="/forgot" style={{ color: '#0053b3' }}>
          {translate('auth.forgotMyPassword')}
        </Link>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className={styles.buttons}>
        <Button
          primary
          fullWidth
          onClick={() => this.refs.form.submit()}
          loading={this.props.loading}>
          {translate('auth.login')}
        </Button>
        <Button fullWidth to="/register">
          {translate('auth.createAnAccount')}
        </Button>
      </div>
    )
  }

  render() {
    if (!this.props.loading && this.props.userId) return <LoggedIn />
    return (
      <div>
        <Title text="auth.login" />
        <AutoForm
          mutation="appLogin"
          ref="form"
          onSuccess={this.onSuccess}
          onChange={this.onChange}>
          <Field fieldName="email" type={Text} placeholder="Email" />
          <Field fieldName="masterKey" type={Text} placeholder={translate('auth.masterKey')} />
          <Field
            fieldName="password"
            type={Text}
            placeholder={translate('auth.password')}
            fieldType="password"
          />
          <Field
            fieldName="sharedHardware"
            type={Checkbox}
            label={translate('auth.sharedHardware')}
          />
        </AutoForm>
        {this.renderButtons()}
        {this.renderForgotLink()}
      </div>
    )
  }
}
