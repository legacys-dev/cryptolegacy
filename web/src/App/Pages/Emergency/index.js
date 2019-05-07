import React from 'react'
import styles from './styles.css'
import {Switch, Route} from 'react-router-dom'
import forceLogin from 'App/helpers/auth/forceLogin'
import Kit from './Kit'

@forceLogin
export default class Emergency extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={styles.container}>
        <Switch>
          <Route path="/emergency-kit/:emergencyKitId/:emergencyKey" component={Kit} />
        </Switch>
      </div>
    )
  }
}
