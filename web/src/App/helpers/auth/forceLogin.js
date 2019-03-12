import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import withUserId from './withUserId'

export default function(ComposedComponent) {
  @withRouter
  @withUserId
  class ForceLogin extends React.Component {
    static propTypes = {
      history: PropTypes.object,
      userId: PropTypes.string
    }

    redirect() {
      this.props.history.replace({
        pathname: '/login',
        state: {nextPathname: window.location.pathname}
      })
      return null
    }

    render() {
      if (!this.props.userId) return this.redirect()
      return <ComposedComponent {...this.props} />
    }
  }

  return ForceLogin
}
