import React from 'react'
import Flatpickr from 'react-flatpickr'
import {Spanish} from 'flatpickr/dist/l10n/es'
import moment from 'moment'
import translate from 'App/i18n/translate'
import 'flatpickr/dist/themes/material_blue.css'

const Date = ({value, onChange, errorMessage, format, enableTime, locale, label, description}) => {
  const getOptions = () => {
    return {
      locale,
      formatDate: date => {
        return moment(date).format(format)
      }
    }
  }

  const onDateChange = dates => {
    onChange(dates[0])
  }

  return (
    <div>
      <div className="label">{label}</div>
      <div className="os-input-container">
        <Flatpickr
          className="on-input-text"
          value={value}
          placeholder={translate('components.select')}
          onChange={date => onDateChange(date)}
          options={getOptions()}
          data-enable-time={enableTime}
        />
      </div>
      <div className="description">{description}</div>
      {errorMessage && <div className="field-error">{errorMessage}</div>}
    </div>
  )
}

Date.defaultProps = {
  format: 'DD/MM/YYYY',
  locale: Spanish
}

export default Date
