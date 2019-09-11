import React from 'react'
import styles from './styles.module.css'
import { Route, Switch } from 'react-router-dom'
import Tabs from 'orionsoft-parts/lib/components/Tabs'
import Header from 'App/components/Parts/Header'
import Security from './Security'
import Profile from './Profile'
import translate from 'App/i18n/translate'
import Billing from './Billing'
import Seats from './Seats'

const Layout = ({ children }) => {
  return (
    <div>
      <div className={styles.header}>
        <Header title={translate('settings.title')} />
        <br />
        <Tabs
          items={[
            { title: translate('settings.profile'), path: '/settings' },
            { title: translate('settings.security'), path: '/settings/security' },
            { title: translate('settings.billing'), path: '/settings/billing' },
            { title: translate('settings.seats'), path: '/settings/seats' }
          ]}
        />
      </div>
      <Switch>
        <Route exact path="/settings" component={Profile} />
        <Route path="/settings/security" component={Security} />
        <Route path="/settings/billing" component={Billing} />
        <Route path="/settings/seats" component={Seats} />
      </Switch>
    </div>
  )
}

export default Layout
