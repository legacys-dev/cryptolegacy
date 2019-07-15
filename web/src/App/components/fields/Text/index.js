import React from 'react'

const Text = ({
  onChange,
  value,
  fieldType,
  passProps,
  placeholder,
  errorMessage,
  disabled,
  label,
  description,
  autoComplete
}) => {
  return (
    <div>
      <div className="label">{label}</div>
      <div className="os-input-container">
        <input
          className="os-input-text"
          type={fieldType}
          value={value || ''}
          autoComplete={autoComplete || ''}
          placeholder={placeholder}
          onChange={event => onChange(event.target.value)}
          disabled={disabled}
          onCopy={event => event.preventDefault()}
          {...passProps}
        />
      </div>
      <div className="description">{description}</div>
      {errorMessage && <div className="field-error">{errorMessage}</div>}
    </div>
  )
}

Text.defaultProps = {
  fieldType: 'text',
  value: ''
}

export default Text
