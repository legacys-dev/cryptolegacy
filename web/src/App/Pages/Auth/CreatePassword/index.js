import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/Parts/Button'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import withValidToken from 'App/helpers/registerTokens/withValidToken'
import {setUserMessageKeys} from 'App/helpers/messageKeys'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import {setSession} from '@orion-js/graphql-client'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'
import Translate from 'App/i18n'

@withRouter
@withValidToken
@withMessage
export default class CreatePassword extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object,
    onLogin: PropTypes.func
  }

  state = {}

  @autobind
  async onSuccess(response) {
    const {session, emergencyKitId, emergencyKey, encryptedKeysForMessages, k} = response
    await sleep(1000)
    try {
      await setSession(session)
      this.props.showMessage('Account created successfully')
      await setUserMessageKeys(k, encryptedKeysForMessages)
      const params = {emergencyKitId, emergencyKey}
      this.props.onLogin(params)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  @autobind
  onChange({password, confirmPassword}) {
    this.setState({password, confirmPassword})
  }

  render() {
    const {params} = this.props.match
    const {password, confirmPassword} = this.state
    return (
      <div className={styles.container}>
        <AutoForm
          mutation="password"
          onChange={this.onChange}
          onSuccess={this.onSuccess}
          ref="form"
          doc={{token: params.token}}>
          <Field
            placeholder="Ingresa tu contraseña"
            fieldName="password"
            type={Text}
            fieldType="password"
          />
          <Field
            placeholder="Confirma tu contraseña"
            fieldName="confirmPassword"
            type={Text}
            fieldType="password"
          />
        </AutoForm>
        <Button
          primary
          fullWidth
          onClick={() => this.refs.form.submit()}
          disabled={!password || !confirmPassword}>
          <Translate tr="auth.createPassword" />
        </Button>
      </div>
    )
  }
}
