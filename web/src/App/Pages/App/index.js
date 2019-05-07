import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Settings from './Settings'
import Layout from './Layout'
import Vaults from './Vaults'

export default class MainHome extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/vaults" component={Vaults} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    )
  }
}
