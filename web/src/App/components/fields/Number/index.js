import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import isNumber from 'lodash/isNumber'

const numeral = global.numeral
if (!numeral) {
  throw new Error('Numeral is required in global variable')
}

export default class Number extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    useHint: PropTypes.bool,
    label: PropTypes.any,
    errorMessage: PropTypes.string,
    disabled: PropTypes.bool,
    passProps: PropTypes.object,
    description: PropTypes.node
  }

  state = { didMount: false }

  static getDerivedStateFromProps(props, state) {
    if (props.value && !state.didMount) {
      const label = isNumber(props.value)
        ? numeral(props.value).format('0,0.[000000000000000000000]')
        : ''
      return { label, didMount: true }
    }
    if (state.didMount && state.value !== props.value) {
      if (props.value) {
        const label = isNumber(props.value)
          ? numeral(props.value).format('0,0.[000000000000000000000]')
          : ''
        return { label, value: props.value }
      } else {
        return { label: '', value: props.value }
      }
    }

    return null
  }

  unformatValue(label) {
    return label === '' ? undefined : numeral._.stringToNumber(label)
  }

  formatValue(real) {
    return isNumber(real) ? numeral(real).format('0,0.[000000000000000000000]') : ''
  }

  @autobind
  onChange(event) {
    const label = event.target.value
    const { onChange } = this.props

    if (!label) {
      this.setState({ label: '' })
      onChange(null)
      return
    }
    const value = this.unformatValue(label)
    const formatted = this.formatValue(event.target.value)
    if (formatted) {
      this.setState({ label: formatted, value })
    } else {
      this.setState({ label, value })
    }
    onChange(value)
  }

  getValue() {
    const { label } = this.state
    const { value } = this.props

    if (label) return label
    if (!value) return ''
    return this.formatValue(value)
  }

  @autobind
  onBlur(event) {
    if (!event.target.value) return
    const real = this.formatValue(event.target.value)
    this.setState({ label: real })
  }

  @autobind
  onKeyDown(event) {
    const { value, onChange } = this.props

    if (event.keyCode === 8) {
      if (String(value).length <= 1 || value === 0) {
        this.setState({ label: '' })
        onChange(null)
      }
    }
  }

  render() {
    const { label, passProps, description, errorMessage } = this.props

    return (
      <div>
        <div className="label">{label}</div>
        <div className="os-input-container">
          <input
            className="os-input-text"
            ref="input"
            value={this.getValue()}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onBlur={this.onBlur}
            onCopy={event => event.preventDefault()}
            {...passProps}
          />
        </div>
        <div className="description">{description}</div>
        {errorMessage && <div className="field-error">{errorMessage}</div>}
      </div>
    )
  }
}
