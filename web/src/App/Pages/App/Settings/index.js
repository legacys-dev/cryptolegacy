import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import {Route, Switch} from 'react-router-dom'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import Container from 'orionsoft-parts/lib/components/Container'
import Breadcrumbs from 'App/components/Breadcrumbs'
import forceLogin from 'App/helpers/auth/forceLogin'
import Security from './Security'
import Profile from './Profile'
import Translate from 'App/i18n'

@forceLogin
export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (
      <div>
        <div className={styles.header}>
          <Breadcrumbs>
            <Translate tr="settings.title" />
          </Breadcrumbs>
          <br />
          <Tabs
            items={[
              {title: <Translate tr="settings.profile" />, path: '/settings'},
              {title: <Translate tr="settings.security" />, path: '/settings/security'}
            ]}
          />
        </div>
        <Container>
          <Switch>
            <Route exact path="/settings" component={Profile} />
            <Route path="/settings/security" component={Security} />
          </Switch>
        </Container>
      </div>
    )
  }
}
