import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/LargeButton'
import LoggedIn from '../LoggedIn'
import {Link} from 'react-router-dom'
import Title from 'App/components/Auth/Title'
import Translate from 'App/i18n'
import autobind from 'autobind-decorator'
import withUserId from 'App/helpers/auth/withUserId'
import translate from 'App/i18n/translate'
import {withRouter} from 'react-router'

@withUserId
@withRouter
export default class Register extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    onLogin: PropTypes.func,
    userId: PropTypes.string
  }

  @autobind
  async onSuccess(token) {
    const {history} = this.props
    history.push(`/verify-email/${token}`)
  }

  renderLogInLink() {
    return (
      <div className={styles.link}>
        <Translate tr="auth.ifYouHaveAnAccount" />{' '}
        <Link to="/login" style={{color: '#07f'}}>
          <Translate tr="auth.loginNow" />
        </Link>
      </div>
    )
  }

  renderButton() {
    return (
      <div className={styles.button}>
        <Button
          label={translate('auth.createAccount')}
          onClick={() => this.refs.form.submit()}
          primary
        />
      </div>
    )
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        <Title text="auth.register" />
        <AutoForm mutation="emailRegister" ref="form" onSuccess={this.onSuccess} />
        {this.renderButton()}
        {this.renderLogInLink()}
      </div>
    )
  }
}