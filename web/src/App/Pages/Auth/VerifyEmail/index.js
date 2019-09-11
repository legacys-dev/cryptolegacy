import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/Parts/Button'
import withValidToken from 'App/helpers/registerTokens/withValidToken'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router'
import translate from 'App/i18n/translate'
import { Field } from 'simple-react-form'
import Text from 'App/components/fields/Text'

@withRouter
@withValidToken
@withMessage
export default class VerifyEmail extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object
  }

  state = {}

  @autobind
  async onSuccess(token) {
    await sleep(1000)
    this.props.history.push(`/password/${token}`)
  }

  @autobind
  onError() {
    this.props.showMessage(translate('auth.timeLimitMessage'))
    this.props.history.push('/register')
  }

  @autobind
  onChange({ code }) {
    this.setState({ code })
  }

  render() {
    const { params } = this.props.match
    const { code } = this.state
    return (
      <div className={styles.container}>
        <AutoForm
          mutation="confirmEmail"
          onChange={this.onChange}
          onSuccess={this.onSuccess}
          ref="form"
          doc={{ token: params.token }}
          onError={this.onError}>
          <Field
            fieldName="code"
            type={Text}
            fieldType="code"
            placeholder={translate('auth.codePlaceholder')}
            description={translate('auth.codeDescription')}
          />
        </AutoForm>
        <div className={styles.button}>
          <Button primary fullWidth onClick={() => this.refs.form.submit()} disabled={!code}>
            {translate('auth.confirmEmail')}
          </Button>
        </div>
      </div>
    )
  }
}
