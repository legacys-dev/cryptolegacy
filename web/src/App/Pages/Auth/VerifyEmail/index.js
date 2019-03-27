import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/Parts/Button'
import withValidToken from 'App/helpers/registerTokens/withValidToken'
import Translate from 'App/i18n'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'

@withRouter
@withValidToken
export default class VerifyEmail extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object
  }

  state = {}

  @autobind
  onSuccess(token) {
    const {history} = this.props
    history.push(`/password/${token}`)
  }

  @autobind
  onChange({code}) {
    this.setState({code})
  }

  render() {
    const {params} = this.props.match
    const {code} = this.state
    return (
      <div className={styles.container}>
        <AutoForm
          mutation="confirmEmail"
          onChange={this.onChange}
          onSuccess={this.onSuccess}
          ref="form"
          doc={{token: params.token}}
          omit={['token']}
        />
        <div className={styles.button}>
          <Button primary fullWidth onClick={() => this.refs.form.submit()} disabled={!code}>
            <Translate tr="auth.confirmEmail" />
          </Button>
        </div>
      </div>
    )
  }
}
