import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import forceLogin from 'App/helpers/auth/forceLogin'
import Actions from './Actions'
import Settings from './Settings'
import Layout from './Layout'
import Vaults from './Vaults'
import Trash from './Trash'

@forceLogin
export default class MainHome extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/trash" component={Trash} />
          <Route path="/actions" component={Actions} />
          <Route path="/vaults" component={Vaults} />
          <Redirect from="/" to="vaults" />
        </Switch>
      </Layout>
    )
  }
}
