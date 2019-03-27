import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import forceLogin from 'App/helpers/auth/forceLogin'
import Vaults from './Vaults'
import gql from 'graphql-tag'
import SideMenu from './SideMenu'
import links from './links'

@forceLogin
@withGraphQL(gql`
  query user {
    me {
      _id
      roles
    }
  }
`)
export default class Admin extends React.Component {
  static propTypes = {
    me: PropTypes.object
  }

  renderWithoutPermissions() {
    return <div className={styles.permissions}>No tienes permisos</div>
  }

  render() {
    const {me} = this.props
    if (!me.roles || !me.roles.includes('admin')) return this.renderWithoutPermissions()
    return (
      <div className={styles.container}>
        <SideMenu title="Admin" links={links}>
          <Switch>
            <Redirect path="/admin" exact to="/admin/vaults" />
            <Route path="/admin/vaults" component={Vaults} />
          </Switch>
        </SideMenu>
      </div>
    )
  }
}
