import React from 'react'
import PropTypes from 'prop-types'
import withEmergencyKeys from './withEmergencyKeys'
import withGraphQL from 'react-apollo-decorators/lib/withGraphQL'
import gql from 'graphql-tag'

export default function(ComposedComponent) {
  @withEmergencyKeys
  @withGraphQL(gql`
    query itsValidKitHorary($emergencyKitId: String, $emergencyKey: String) {
      itsValidKitHorary(emergencyKitId: $emergencyKitId, emergencyKey: $emergencyKey)
    }
  `)
  class withValidKitHorary extends React.Component {
    static propTypes = {
      emergencyKitId: PropTypes.string,
      emergencyKey: PropTypes.string,
      itsValidKitHorary: PropTypes.bool
    }

    state = {itsValidKitHorary: false}

    static getDerivedStateFromProps(props, state) {
      const {itsValidKitHorary} = props
      if (!itsValidKitHorary) return {itsValidKitHorary: false}
      return {itsValidKitHorary: true}
    }

    redirectHome() {
      this.props.history.replace({
        pathname: '/',
        state: {invalidHorary: true}
      })

      return <span />
    }

    render() {
      if (!this.state.itsValidKitHorary) return this.redirectHome()
      return <ComposedComponent {...this.props} />
    }
  }

  return withValidKitHorary
}
