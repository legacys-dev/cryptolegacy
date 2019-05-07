import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import Button from 'App/components/Parts/Button'
import LoggedIn from '../LoggedIn'
import {Link} from 'react-router-dom'
import Title from 'App/components/Auth/Title'
import Translate from 'App/i18n'
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

  @autobind
  onSuccess() {
    this.props.showMessage(translate('auth.followInstructionsInEmail'))
  }

  renderLogInLink() {
    return (
      <div className={styles.link}>
        <Translate tr="auth.ifYouHaveAnAccount" />{' '}
        <Link to="/login" style={{color: '#0053b3'}}>
          <Translate tr="auth.loginNow" />
        </Link>
      </div>
    )
  }

  renderButton() {
    return (
      <div className={styles.button}>
        <Button primary fullWidth onClick={() => this.refs.form.submit()}>
          <Translate tr="auth.resetPassword" />
        </Button>
      </div>
    )
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        <Title text="auth.forgotPassword" />
        <AutoForm mutation="forgotPassword" ref="form" onSuccess={this.onSuccess}>
          <Field fieldName="email" type={Text} placeholder="Email" fieldType="email" />
        </AutoForm>
        {this.renderButton()}
        {this.renderLogInLink()}
      </div>
    )
  }
}
