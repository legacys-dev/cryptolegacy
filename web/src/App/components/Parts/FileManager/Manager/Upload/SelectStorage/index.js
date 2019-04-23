import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import autobind from 'autobind-decorator'
import isEqual from 'lodash/isEqual'
import styles from './styles.js'
import simpleStyle from './simpleStyle.css'

export default class SelectStorage extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    description: PropTypes.node,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.any
  }

  static defaultProps = {
    placeholder: 'Select storage type',
    description:
      'There are two types of storage. simple, where you will have quick access to your files and high security, where your files are stored in a high security vault but access to files is slower.',
    options: [
      {label: 'Simple storage', value: 'b2'},
      {label: 'High security storage', value: 'glacier'}
    ]
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    const {onChange} = this.props
    if (!isEqual(prevProps.options, this.props.options)) {
      if (!this.getValue()) {
        onChange(null)
      }
    }
  }

  @autobind
  onChange(params) {
    const {onChange} = this.props
    if (params && params.value) {
      onChange(params.value)
    } else {
      onChange(null)
    }
  }

  getValue() {
    const {value, options} = this.props
    const selectedOption = options.find(option => option.value === value)
    if (!selectedOption) return null
    return selectedOption
  }

  render() {
    const {placeholder, description, options} = this.props
    return (
      <div>
        <Select
          placeholder={placeholder}
          styles={styles}
          value={this.getValue()}
          onChange={this.onChange}
          options={options}
        />
        <div className={simpleStyle.description}>{description}</div>
      </div>
    )
  }
}
