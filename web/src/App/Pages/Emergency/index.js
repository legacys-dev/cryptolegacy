import React from 'react'
import styles from './styles.css'
import {Switch, Route} from 'react-router-dom'
import forceLogin from 'App/helpers/auth/forceLogin'
import InactivityTimer from 'App/components/InactivityTimer'
import Kit from './Kit'

@forceLogin
export default class Emergency extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <InactivityTimer time={5}>
          <Switch>
            <Route path="/emergency-kit/:emergencyKitId" component={Kit} />
          </Switch>
        </InactivityTimer>
      </div>
    )
  }
}
