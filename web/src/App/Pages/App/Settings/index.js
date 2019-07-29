import React from 'react'
import styles from './styles.module.css'
import {Route, Switch} from 'react-router-dom'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import Breadcrumbs from 'App/components/Breadcrumbs'
import Security from './Security'
import Profile from './Profile'
import translate from 'App/i18n/translate'

const Layout = ({children}) => {
  return (
    <div>
      <div className={styles.header}>
        <Breadcrumbs>
          {translate('settings.title')}
        </Breadcrumbs>
        <br />
        <Tabs
          items={[
            {title: translate('settings.profile'), path: '/settings'},
            {title: translate('settings.security'), path: '/settings/security'}
          ]}
        />
      </div>
      <Switch>
        <Route exact path="/settings" component={Profile} />
        <Route path="/settings/security" component={Security} />
      </Switch>
    </div>
  )
}

export default Layout
