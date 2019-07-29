import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Loading from 'orionsoft-parts/lib/components/Loading'
import translate from 'App/i18n/translate'
import withMutation from 'react-apollo-decorators/lib/withMutation'
import gql from 'graphql-tag'
import autobind from 'autobind-decorator'
import sleep from 'orionsoft-parts/lib/helpers/sleep'
import {setSession} from '@orion-js/graphql-client'

@withMutation(gql`
  mutation verifyEmail($token: String) {
    session: verifyEmail(token: $token) {
      _id
      userId
      roles
      publicKey
      secretKey
    }
  }
`)
export default class VerifyEmail extends React.Component {
  static propTypes = {
    verifyEmail: PropTypes.func,
    token: PropTypes.object,
    onLogin: PropTypes.func
  }

  state = {}

  componentDidMount() {
    this.verify()
  }

  @autobind
  async verify() {
    await sleep(2000)
    try {
      const {session} = await this.props.verifyEmail({
        token: this.props.token
      })
      await setSession(session)
      this.props.onLogin()
    } catch (error) {
      if (error.message.includes('Validation Error')) {
        this.setState({errorMessage: translate('auth.emailVerficationCodeExpired')})
      } else {
        this.setState({errorMessage: error.message})
      }
    }
  }

  render() {
    const {errorMessage} = this.state
    if (this.state.errorMessage) return <div className={styles.error}>{errorMessage}</div>
    return (
      <div className={styles.loading}>
        <Loading size={40} />
        <p>
          {translate('auth.weAreVerifyingYourEmail')}
        </p>
      </div>
    )
  }
}
