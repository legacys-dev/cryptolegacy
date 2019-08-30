import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import Button from 'App/components/Parts/Button'
import LoggedIn from '../LoggedIn'
import Login from '../Login'
import {Link} from 'react-router-dom'
import Title from 'App/components/Auth/Title'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import withUserId from 'App/helpers/auth/withUserId'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'

@withUserId
@withMessage
export default class ForgotPassword extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    userId: PropTypes.string
  }
  state = {sentEmail: false}

  @autobind
  onSuccess() {
    this.setState({sentEmail: true})
  }

  renderLogInLink() {
    return (
      <div className={styles.link}>
        {translate('auth.ifYouHaveAnAccount')}{' '}
        <Link to="/login" style={{color: '#0053b3'}}>
          {translate('auth.loginNow')}
        </Link>
      </div>
    )
  }

  renderButton() {
    return (
      <div className={styles.button}>
        <Button primary fullWidth onClick={() => this.refs.form.submit()}>
          {translate('auth.resetPassword')}
        </Button>
      </div>
    )
  }

  renderButtonLogin() {
    return (
      <Link to="/login">
        <div className={styles.button}>
          <Button primary fullWidth>
            {translate('auth.returnToLogin')}
          </Button>
        </div>
      </Link>
    )
  }
  // usar estado para cambiar la pantalla al mandar el correo
  render() {
    if (this.props.userId) return <LoggedIn />
    if (this.state.sentEmail === true) return <div>{this.renderButtonLogin()}</div>
    return (
      <div>
        <Title text="auth.forgotPassword" />
        <AutoForm mutation="missedPassword" ref="form" onSuccess={this.onSuccess}>
          <Field fieldName="email" type={Text} placeholder="Email" fieldType="email" />
        </AutoForm>
        {this.renderButton()}
        {this.renderLogInLink()}
      </div>
    )
  }
}
