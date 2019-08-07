import React from 'react'
import styles from './styles.module.css'
import {Route, Switch} from 'react-router-dom'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import Header from 'App/components/Parts/Header'
import Security from './Security'
import Profile from './Profile'
import translate from 'App/i18n/translate'

const Layout = ({children}) => {
  return (
    <div>
      <div className={styles.header}>
        <Header title={translate('settings.title')}/>
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
