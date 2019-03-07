import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import Button from 'App/components/LargeButton'
import Title from 'App/components/Auth/Title'
import LoggedIn from '../LoggedIn'
import {Link} from 'react-router-dom'
import Translate from 'App/i18n'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import withUserId from 'App/helpers/auth/withUserId'
import {setSession} from '@orion-js/graphql-client'

@withUserId
export default class Login extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func,
    userId: PropTypes.string,
    loading: PropTypes.bool
  }

  @autobind
  async onSuccess(session) {
    await setSession(session)
    this.props.onLogin()
  }

  renderForgotLink() {
    return (
      <div className={styles.forgotLink}>
        <Link to="/forgot" style={{color: '#07f'}}>
          <Translate tr="auth.forgotMyPassword" />
        </Link>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className={styles.buttons}>
        <Button
          onClick={() => this.refs.form.submit()}
          label={translate('auth.login')}
          primary
          loading={this.props.loading}
        />
        <div name="divider" style={{height: '20px'}} />
        <Button primary={false} label={translate('auth.createAnAccount')} to="/register" />
      </div>
    )
  }

  render() {
    if (!this.props.loading && this.props.userId) return <LoggedIn />
    return (
      <div>
        <Title text="auth.login" />
        <AutoForm mutation="loginWithPassword" ref="form" onSuccess={this.onSuccess}>
          <Field fieldName="email" type={Text} fieldType="email" placeholder="Email" />
          <Field
            fieldName="password"
            type={Text}
            fieldType="password"
            placeholder={translate('auth.password')}
          />
        </AutoForm>
        {this.renderButtons()}
        {this.renderForgotLink()}
      </div>
    )
  }
}
