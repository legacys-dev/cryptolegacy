import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home'
import Settings from './Settings'
import Layout from './Layout'
import Vaults from './Vaults'
import Trash from './Trash'
import Actions from './Actions'

export default class MainHome extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/all-trash" component={Trash} />
          <Route path="/actions" component={Actions} />
          <Route path="/vaults" component={Vaults} />
          <Redirect from="/" to="vaults" />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    )
  }
}
