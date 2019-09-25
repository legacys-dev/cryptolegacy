import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import InactivityTimer from 'App/components/InactivityTimer'
import forceLogin from 'App/helpers/auth/forceLogin'
import Invitations from './Invitations'
import Settings from './Settings'
import Actions from './Actions'
import Layout from './Layout'
import Vaults from './Vaults'
import Trash from './Trash'

@forceLogin
export default class MainHome extends React.Component {
  static propTypes = {
    showMessage: PropTypes.func
  }

  render() {
    return (
      <InactivityTimer time={10}>
        <Layout>
          <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/trash" component={Trash} />
            <Route path="/actions" component={Actions} />
            <Route path="/vaults" component={Vaults} />
            <Route path="/invitations" component={Invitations} />
            <Redirect from="/" to="vaults" />
          </Switch>
        </Layout>
      </InactivityTimer>
    )
  }
}
