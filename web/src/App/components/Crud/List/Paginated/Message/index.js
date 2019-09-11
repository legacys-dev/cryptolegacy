import React from 'react'
import {MdError} from 'react-icons/md'

const Message = ({message}) => {
  return (
    <div className="paginated-error">
      <div className="paginated-error-icon">
        <MdError />
      </div>
      <div className="paginated-error-message">{message}</div>
    </div>
  )
}

export default Message
