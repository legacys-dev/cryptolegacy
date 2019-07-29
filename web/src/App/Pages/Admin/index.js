import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import InactivityTimer from 'App/components/InactivityTimer'
import forceLogin from 'App/helpers/auth/forceLogin'
import Heritages from './Heritages'
import SideMenu from './SideMenu'
import gql from 'graphql-tag'
import links from './links'
import translate from 'App/i18n/translate'

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
    return <div className={styles.permissions}>{translate('admin.youHaveNotPermissions')}</div>
  }

  render() {
    const {me} = this.props
    if (!me.roles || !me.roles.includes('admin')) return this.renderWithoutPermissions()
    return (
      <div className={styles.container}>
        <InactivityTimer time={10}>
          <SideMenu title="Admin" links={links}>
            <Switch>
              <Redirect path="/admin" exact to="/admin/heritages" />
              <Route path="/admin/heritages" component={Heritages} />
            </Switch>
          </SideMenu>
        </InactivityTimer>
      </div>
    )
  }
}
