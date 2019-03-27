import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/Parts/Button'
import {Field} from 'simple-react-form'
import Text from 'App/components/fields/Text'
import withValidToken from 'App/helpers/registerTokens/withValidToken'
import {setSession} from '@orion-js/graphql-client'
import Translate from 'App/i18n'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'

@withRouter
@withValidToken
export default class CreatePassword extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    onLogin: PropTypes.func
  }

  state = {}

  @autobind
  async onSuccess(session) {
    await setSession(session)
    this.props.onLogin()
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
