import React from 'react'
import {MdError} from 'react-icons/md'
import PropTypes from 'prop-types'

export default class Message extends React.Component {
  static propTypes = {
    message: PropTypes.node
  }

  render() {
    return (
      <div className="paginated-error">
        <div className="paginated-error-icon">
          <MdError />
        </div>
        <div className="paginated-error-message">{this.props.message}</div>
      </div>
    )
  }
}
