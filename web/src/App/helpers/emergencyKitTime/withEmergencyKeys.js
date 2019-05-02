import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

export default function(ComposedComponent) {
  @withRouter
  class withEmergencyKeys extends React.Component {
    static propTypes = {
      match: PropTypes.object
    }

    render() {
      const {params} = this.props.match
      return (
        <ComposedComponent
          emergencyKitId={params.emergencyKitId}
          emergencyKey={params.emergencyKey}
          {...this.props}
        />
      )
    }
  }

  return withEmergencyKeys
}
