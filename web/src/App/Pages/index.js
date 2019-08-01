import React, {lazy} from 'react'
import PropTypes from 'prop-types'
import authRouteRegex from './Auth/routeRegex'
import {withRouter} from 'react-router'
import SuspenseLoading from 'App/components/Parts/SuspenseLoading'
import App from './App'

@withRouter
export default class Pages extends React.Component {
  static propTypes = {
    location: PropTypes.object
  }

  renderComponents() {
    const {pathname} = this.props.location

    if (authRouteRegex.test(pathname)) {
      const Auth = lazy(() => import('./Auth'))
      return <Auth />
    }

    if (pathname.startsWith('/admin')) {
      const Admin = lazy(() => import('./Admin'))
      return <Admin />
    }

    if (pathname.startsWith('/emergency-kit')) {
      const EmergencyKit = lazy(() => import('./Emergency'))
      return <EmergencyKit />
    }

    if (pathname.startsWith('/heritage')) {
      const Heritage = lazy(() => import('./Heritage'))
      return <Heritage />
    }

    return <App />
  }

  render() {
    return <SuspenseLoading height="100vh">{this.renderComponents()}</SuspenseLoading>
  }
}
