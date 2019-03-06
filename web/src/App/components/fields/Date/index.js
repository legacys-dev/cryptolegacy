import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'
import Flatpickr from 'react-flatpickr'
import {Spanish} from 'flatpickr/dist/l10n/es'
import moment from 'moment'
import autobind from 'autobind-decorator'

import 'flatpickr/dist/themes/material_blue.css'

export default class DateTime extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    errorMessage: PropTypes.string,
    format: PropTypes.string,
    enableTime: PropTypes.bool,
    locale: PropTypes.any,
    label: PropTypes.string
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
    const {value, enableTime, label, errorMessage} = this.props

    return (
      <div>
        <div className="label">{label}</div>
        <div className={styles.osInputContainer}>
          <Flatpickr
            className={styles.osInputText}
            value={value}
            placeholder="Seleccionar..."
            onChange={this.onChange}
            options={this.getOptions()}
            data-enable-time={enableTime}
          />
        </div>
        <div className={styles.osInputError}>{errorMessage}</div>
      </div>
    )
  }
}
