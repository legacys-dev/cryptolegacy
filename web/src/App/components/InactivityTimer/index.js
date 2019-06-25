import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import withMessage from 'orionsoft-parts/lib/decorators/withMessage'
import logout from 'App/helpers/auth/logout'
import IdleTimer from 'react-idle-timer'
import autobind from 'autobind-decorator'
import getEnv from 'App/Root/getEnv'

@withMessage
export default class InactivityTimer extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func,
    children: PropTypes.node,
    time: PropTypes.number
  }

  static defaultProps = {
    time: 10
  }

  @autobind
  async onInactivity() {
    if (this.mustStayLogin()) return
    await logout()
    this.props.showMessage('Se ha cerrado sesión por inactividad')
  }

  mustStayLogin() {
    return getEnv() === 'local'
  }

  inactivityChecker() {
    return (
      <IdleTimer onIdle={this.onInactivity} debounce={250} timeout={1000 * 60 * this.props.time} />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.inactivityChecker()}
        {this.props.children}
      </div>
    )
  }
}
