import React from 'react'

const Text = ({onChange, value, fieldType, passProps, placeholder, errorMessage}) => {
  return (
    <div className="paginated-text-field">
      <input
        className="paginated-text-field-input"
        type={fieldType}
        value={value}
        placeholder={placeholder}
        onChange={event => this.props.onChange(event.target.value)}
        {...passProps}
      />
      <div className="paginated-text-field-error">{errorMessage}</div>
    </div>
  )
}
Text.defaultProps = {
  fieldType: 'text'
}

export default Text
