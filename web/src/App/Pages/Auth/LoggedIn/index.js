import React from 'react'
import styles from './styles.css'
import Button from 'App/components/Parts/Button'
import logout from 'App/helpers/auth/logout'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import translate from 'App/i18n/translate'

@withRouter
export default class Logout extends React.Component {
  static propTypes = {
    history: PropTypes.object
  }

  async logout() {
    await logout()
  }

  render() {
    return (
      <div className={styles.container}>
        <p>{translate('auth.youAreLoggedIn')}</p>
        <Button onClick={() => this.props.history.push('/')}>{translate('auth.goHome')}</Button>
        <Button onClick={this.logout} danger>
          {translate('auth.signOut')}
        </Button>
      </div>
    )
  }
}
