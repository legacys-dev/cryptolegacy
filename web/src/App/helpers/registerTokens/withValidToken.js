import React from 'react'
import PropTypes from 'prop-types'
import withRegisterToken from './withRegisterToken'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

export default function(ComposedComponent) {
  @withRegisterToken
  @withGraphQL(gql`
    query getToken($regisToken: String) {
      itsValidToken(regisToken: $regisToken)
    }
  `)
  class withValidToken extends React.Component {
    static propTypes = {
      regisToken: PropTypes.string,
      itsValidToken: PropTypes.bool
    }

    state = {itsValidToken: false}

    static getDerivedStateFromProps(props, state) {
      const {itsValidToken} = props
      if (!itsValidToken) return {itsValidToken: false}
      return {itsValidToken: true}
    }

    redirectRegister() {
      this.props.history.replace({
        pathname: '/register',
        state: {invalidToken: true}
      })

      return <span />
    }

    render() {
      if (!this.state.itsValidToken) return this.redirectRegister()
      return <ComposedComponent {...this.props} />
    }
  }

  return withValidToken
}
