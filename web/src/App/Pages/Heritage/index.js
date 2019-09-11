import React from 'react'
import styles from './styles.css'
import { Switch, Route } from 'react-router-dom'
import forceLogin from 'App/helpers/auth/forceLogin'
import InactivityTimer from 'App/components/InactivityTimer'
import Claim from './Claim'

@forceLogin
export default class Emergency extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <InactivityTimer time={5}>
          <Switch>
            <Route path="/heritage/:accessToken" component={Claim} />
          </Switch>
        </InactivityTimer>
      </div>
    )
  }
}
