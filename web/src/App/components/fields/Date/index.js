import React from 'react'
import PropTypes from 'prop-types'
import Flatpickr from 'react-flatpickr'
import {Spanish} from 'flatpickr/dist/l10n/es'
import moment from 'moment'
import autobind from 'autobind-decorator'

import 'flatpickr/dist/themes/material_blue.css'

export default class Date extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    format: PropTypes.string,
    enableTime: PropTypes.bool,
    locale: PropTypes.any,
    label: PropTypes.string,
    description: PropTypes.node
  }

  static defaultProps = {
    format: 'DD/MM/YYYY',
    locale: Spanish
  }

  state = {
    focused: false
  }

  getOptions() {
    const {format, locale} = this.props

    return {
      locale,
      formatDate: date => {
        return moment(date).format(format)
      }
    }
  }

  @autobind
  onChange(dates) {
    this.props.onChange(dates[0])
  }

  render() {
    const {value, enableTime, label, errorMessage, description} = this.props

    return (
      <div>
        <div className="label">{label}</div>
        <div className="os-input-container">
          <Flatpickr
            className="on-input-text"
            value={value}
            placeholder="Seleccionar..."
            onChange={this.onChange}
            options={this.getOptions()}
            data-enable-time={enableTime}
          />
        </div>
        <div className="description">{description}</div>
        {errorMessage && <div className="field-error">{errorMessage}</div>}
      </div>
    )
  }
}
