import React from 'react'
import LocaleContext from './LocaleContext'
import getLocale from './getLocale'
import numeral from 'numeral'
import moment from 'moment'

export default function LocaleProvider(props) {
  const [, forceUpdate] = React.useState()

  const setLocale = locale => {
    window.localStorage.setItem('locale', locale)
    moment.locale(locale)
    numeral.locale(locale)
    forceUpdate()
  }

  return (
    <LocaleContext.Provider value={{ locale: getLocale(), setLocale }}>
      {props.children}
    </LocaleContext.Provider>
  )
}
