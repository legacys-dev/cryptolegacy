import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import { Field } from 'simple-react-form'
import Text from 'App/components/fields/Text'
import Button from 'App/components/Parts/Button'
import LoggedIn from '../LoggedIn'
import autobind from 'autobind-decorator'
import withUserId from 'App/helpers/auth/withUserId'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
<<<<<<< HEAD
=======
import { setSession } from '@orion-js/graphql-client'
>>>>>>> 1cef36dda80b7e8d6e7142a7587ddbb01ea47289
import translate from 'App/i18n/translate'
import {withRouter} from 'react-router-dom'

@withRouter
@withUserId
@withMessage
export default class ResetPassword extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    onLogin: PropTypes.func,
    userId: PropTypes.string,
    token: PropTypes.string,
    history: PropTypes.func
  }

  schema = {
    password: {
      type: String,
      min: 8
    },
    confirm: {
      type: String,
      custom(
        confirm,
        {
          doc: { password }
        }
      ) {
        if (confirm !== password) {
          return 'passwordsDontMatch'
        }
      }
    },
    token: {
      type: String
    }
  }

  @autobind
  async onSuccess() {
    this.props.showMessage(translate('auth.yourPasswordHasBeenChanged'))
    this.props.history.push('/login')
  }

  @autobind
  onValidationError({ token }) {
    if (token === 'tokenNotFound') this.props.showMessage(translate('auth.resetLinkExpired'))
  }

  renderDescription() {
    return <div className={styles.description}>{translate('auth.passwordRequirements')}</div>
  }

  renderButton() {
    return (
      <div className={styles.button}>
        <Button onClick={() => this.refs.form.submit()} primary>
          {translate('auth.resetPassword')}
        </Button>
      </div>
    )
  }

  render() {
    if (this.props.userId) return <LoggedIn />
    return (
      <div>
        {translate('auth.resetPassword')}
        <AutoForm
          doc={{ token: this.props.token }}
          mutation="resetPassword"
          ref="form"
          schema={this.schema}
          onSuccess={this.onSuccess}
          onValidationError={this.onValidationError}>
          <Field
            fieldName="password"
            fieldType="password"
            placeholder={translate('auth.newPassword')}
            type={Text}
          />
          <Field
            fieldName="confirm"
            fieldType="password"
            placeholder={translate('auth.confirmPassword')}
            type={Text}
          />
        </AutoForm>
        {this.renderDescription()}
        {this.renderButton()}
      </div>
    )
  }
}
