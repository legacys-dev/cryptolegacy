import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import autobind from 'autobind-decorator'
import isEqual from 'lodash/isEqual'
import styles from './styles.js'
import simpleStyle from './simpleStyle.css'
import Warning from './Warning'
import translate from 'App/i18n/translate'

export default class SelectStorage extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    description: PropTypes.node,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.any
  }

  static defaultProps = {
    placeholder: translate('fileManager.storageType'),
    description: translate('fileManager.descriptionType'),
    options: [
      {label: translate('fileManager.simpleType'), value: 'b2'},
      {label: translate('fileManager.highType'), value: 'glacier'}
    ]
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.options, this.props.options)) {
      if (!this.getValue()) this.props.onChange(null)
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
        <div className={styles.warning}>
          <Warning />
        </div>
      </div>
    )
  }
}
