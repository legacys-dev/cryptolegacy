import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/Parts/Button'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import LoggedIn from '../LoggedIn'
import {Link} from 'react-router-dom'
import Title from 'App/components/Auth/Title'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import withUserId from 'App/helpers/auth/withUserId'
import {withRouter} from 'react-router'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'



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
    await sleep(1000)
    this.props.history.push(`/verify-email/${token}`)
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
          {translate('auth.createAccount')}
        </Button>
      </div>
    )
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        <Title text="auth.register" />
        <AutoForm mutation="emailRegister" ref="form" onSuccess={this.onSuccess}>
          <Field
            fieldName="email"
            type={Text}
            fieldType="email"
            placeholder="Email"
          />
          <Field
            fieldName="name"
            type={Text}
            fieldType="name"
            placeholder={translate('auth.name')}
          />
          <Field
            fieldName="lastName"
            type={Text}
            fieldType="lastName"
            placeholder={translate('auth.lastName')}
          />

        </AutoForm>
        {this.renderButton()}
        {this.renderLogInLink()}
      </div>
    )
  }
}
