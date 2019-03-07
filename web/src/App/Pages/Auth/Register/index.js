import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import Button from 'App/components/LargeButton'
import ObjectField from 'App/components/fields/ObjectField'
import LoggedIn from '../LoggedIn'
import {Link} from 'react-router-dom'
import Title from 'App/components/Auth/Title'
import Translate from 'App/i18n'
import autobind from 'autobind-decorator'
import withUserId from 'App/helpers/auth/withUserId'
import {setSession} from '@orion-js/graphql-client'
import translate from 'App/i18n/translate'

@withUserId
export default class Register extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func,
    userId: PropTypes.string
  }

  @autobind
  async onSuccess(session) {
    await setSession(session)
    this.props.onLogin()
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
        <AutoForm mutation="createUser" ref="form" onSuccess={this.onSuccess}>
          <Field fieldName="profile" type={ObjectField} style={null}>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <Field fieldName="firstName" type={Text} placeholder={translate('auth.name')} />
              </div>
              <div className="col-xs-12 col-sm-6">
                <Field fieldName="lastName" type={Text} placeholder={translate('auth.lastName')} />
              </div>
            </div>
          </Field>
          <Field fieldName="email" type={Text} fieldType="email" placeholder="Email" />
          <Field
            fieldName="password"
            type={Text}
            fieldType="password"
            placeholder={translate('auth.password')}
          />
        </AutoForm>
        {this.renderButton()}
        {this.renderLogInLink()}
      </div>
    )
  }
}
