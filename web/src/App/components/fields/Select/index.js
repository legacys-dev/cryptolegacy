import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import autobind from 'autobind-decorator'
import isEqual from 'lodash/isEqual'
import styles from './styles'

export default class SelectField extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    passProps: PropTypes.object,
    errorMessage: PropTypes.node,
    label: PropTypes.node,
    description: PropTypes.node,
    placeholder: PropTypes.string,
    multi: PropTypes.bool,
    options: PropTypes.array
  }

  static defaultProps = {
    options: []
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.options, this.props.options)) {
      if (!this.getValue()) this.props.onChange(null)
    }
  }

  @autobind
  onChange(params) {
    const {multi, onChange} = this.props
    if (multi) {
      onChange(params.map(item => item.value))
    } else {
      if (params && params.value) {
        onChange(params.value)
      } else {
        onChange(null)
      }
    }
  }

  getValue() {
    const {value, options, multi} = this.props
    if (multi) {
      const selectedOptions = (value || []).map(optionValue =>
        (options || []).find(option => option.value === optionValue)
      )
      return selectedOptions.filter(option => !!option)
    } else {
      const selectedOption = options.find(option => option.value === value)
      if (!selectedOption) return null
      return selectedOption
    }
  }

  render() {
    const {
      label,
      multi,
      fieldName,
      options,
      placeholder,
      description,
      errorMessage,
      passProps
    } = this.props

    return (
      <div>
        <div className="label">{label}</div>
        <Select
          styles={styles}
          isMulti={multi}
          name={fieldName}
          value={this.getValue()}
          onChange={this.onChange}
          options={options}
          placeholder={placeholder}
          {...passProps}
        />
        <div className="description">{description}</div>
        {errorMessage && <div className="field-error">{errorMessage}</div>}
      </div>
    )
  }
}
