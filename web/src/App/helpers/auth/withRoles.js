import React from 'react'
import PropTypes from 'prop-types'
import withSession from './withSession'

export default ComposedComponent => {
  class WithUserId extends React.Component {
    static propTypes = {
      session: PropTypes.object
    }

    render() {
      const { roles } = this.props.session
      return <ComposedComponent {...this.props} roles={roles} />
    }
  }

  return withSession(WithUserId)
}
