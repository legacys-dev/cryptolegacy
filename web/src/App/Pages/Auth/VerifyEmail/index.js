import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import AutoForm from 'App/components/AutoForm'
import Button from 'App/components/LargeButton'
import translate from 'App/i18n/translate'
import autobind from 'autobind-decorator'
import {withRouter} from 'react-router'

@withRouter
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
          <Button
            label={translate('auth.confirmEmail')}
            onClick={() => this.refs.form.submit()}
            disabled={!code}
            primary
          />
        </div>
      </div>
    )
  }
}
