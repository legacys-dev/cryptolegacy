import React, {useEffect, useRef} from 'react'
import ReactSelect from 'react-select'
import isEqual from 'lodash/isEqual'
import styles from './styles'

Select.defaultProps = {
  options: []
}

export default function Select({
  fieldName,
  onChange,
  value,
  passProps,
  errorMessage,
  label,
  description,
  placeholder,
  multi,
  options
}) {
  const setPrevOptions = options => {
    const ref = useRef()
    useEffect(() => {
      ref.current = options
    })
    return ref.current
  }

  const prevOptions = setPrevOptions(options)

  useEffect(() => {
    if (!isEqual(prevOptions, options)) {
      if (!getValue()) onChange(null)
    }
  })

  const localOnChange = params => {
    if (multi) onChange(params.map(item => item.value))
    else {
      if (params && params.value) onChange(params.value)
      else onChange(null)
    }
  }

  const getValue = () => {
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

  return (
    <div>
      <div className="label">{label}</div>
      <ReactSelect
        styles={styles}
        isMulti={multi}
        name={fieldName}
        value={getValue()}
        onChange={change => localOnChange(change)}
        options={options}
        placeholder={placeholder}
        onCopy={event => event.preventDefault()}
        {...passProps}
      />
      <div className="description">{description}</div>
      {errorMessage && <div className="field-error">{errorMessage}</div>}
    </div>
  )
}
