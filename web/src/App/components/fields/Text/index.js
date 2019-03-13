import React from 'react'
import PropTypes from 'prop-types'

export default class Text extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    fieldType: PropTypes.string,
    passProps: PropTypes.object,
    placeholder: PropTypes.node,
    errorMessage: PropTypes.node,
    disabled: PropTypes.bool,
    label: PropTypes.node,
    description: PropTypes.node
  }

  static defaultProps = {
    fieldType: 'text',
    value: ''
  }

  render() {
    const {
      label,
      fieldType,
      value,
      placeholder,
      onChange,
      disabled,
      passProps,
      description,
      errorMessage
    } = this.props

    return (
      <div>
        <div className="label">{label}</div>
        <div className="os-input-container">
          <input
            ref="input"
            className="os-input-text"
            type={fieldType}
            value={value || ''}
            placeholder={placeholder}
            onChange={event => onChange(event.target.value)}
            disabled={disabled}
            {...passProps}
          />
        </div>
        <div className="description">{description}</div>
        {errorMessage && <div className="field-error">{errorMessage}</div>}
      </div>
    )
  }
}
