import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Logo from 'App/components/Parts/Logo'
import {Route, Switch, withRouter} from 'react-router-dom'
import Login from './Login'
import RegisterEmail from './RegisterEmail'
import Forgot from './Forgot'
import Reset from './Reset'
import Enroll from './Enroll'
import autobind from 'autobind-decorator'
import VerifyEmail from './VerifyEmail'
import CreatePassword from './CreatePassword'

@withRouter
export default class Auth extends React.Component {
  state = {isLoading: false, error: null}

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    params: PropTypes.object
  }

  @autobind
  onLogin(params) {
    const {location, history} = this.props
    if (location.state && location.state.nextPathname) {
      history.replace('/')
    } else {
      const {emergencyKitId} = params
      if (!emergencyKitId) return
      history.replace(`/emergency-kit/${emergencyKitId}`)
    }
  }

  render() {
    const otherProps = {onLogin: this.onLogin}
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.logoContainer}>
              <Logo imgName="twoColorsBT.png" size={'85px'} />
            </div>
            <Switch>
              <Route path="/login" render={() => <Login {...otherProps} />} />
              <Route path="/register" render={() => <RegisterEmail {...otherProps} />} />
              <Route path="/verify-email/:token" render={() => <VerifyEmail {...otherProps} />} />
              <Route path="/password/:token" render={() => <CreatePassword {...otherProps} />} />
              <Route path="/forgot" render={() => <Forgot {...otherProps} />} />
              <Route
                path="/reset/:token"
                render={({match}) => <Reset token={match.params.token} {...otherProps} />}
              />
              <Route
                path="/enroll/:token"
                render={({match}) => <Enroll token={match.params.token} {...otherProps} />}
              />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
